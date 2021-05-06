<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.keywords"
          clearable
          size="small"
          placeholder="模糊搜索"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.Query"
        />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--表单渲染-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="600px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="form.type" size="mini" style="width: 178px">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-show="form.type.toString() !== '2'"
          label="菜单图标"
          prop="icon"
        >
          <e-icon-picker v-model="form.icon" />
        </el-form-item>
        <el-form-item label="中文名称" prop="nameZh">
          <el-input v-model="form.nameZh" />
        </el-form-item>
        <el-form-item label="英文名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="permission"
        >
          <el-input v-model="form.permission" placeholder="如：menu:list"/>
        </el-form-item>
        <el-form-item
          v-if="form.type.toString() !== '2'"
          label="路由地址"
          prop="path"
        >
          <el-input v-model="form.path" placeholder="路由地址" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            v-model.number="form.sort"
            :min="0"
            :max="999"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-switch
            v-model="form.enabled"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item
          v-show="form.type.toString() === '1'"
          label="组件路径"
          prop="component"
        >
          <el-input
            v-model="form.component"
            placeholder="如：/views/system/menu"
          />
        </el-form-item>
        <el-form-item label="上级类目" prop="parentId">
          <treeselect
            v-model="form.parentId"
            :options="menus"
            :load-options="loadMenus"
            placeholder="选择上级类目"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button
          :loading="crud.status.cu === 2"
          type="primary"
          @click="crud.submitCU"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      lazy
      :load="getMenus"
      :data="crud.data"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="id"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        :show-overflow-tooltip="true"
        label="菜单标题"
        width="125px"
        prop="name"
      />
      <el-table-column prop="icon" label="图标" align="center" width="60px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" label="排序">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="permission"
        label="权限标识"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="component"
        label="组件路径"
      />
      <el-table-column prop="iframe" label="外链" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.iframe">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="cache" label="缓存" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.cache">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="可见" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.hidden">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="135px" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <!-- <el-table-column v-if="checkPer(['admin','menu:edit','menu:del'])" label="操作" width="130px" align="center" fixed="right"> -->
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            msg="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import crudMenu from "@/api/system/menu";
import IconSelect from "@/components/IconSelect";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import CRUD, { presenter, header, form, crud } from "@/components/Crud/crud";
import rrOperation from "@/components/Crud//RR.operation";
import crudOperation from "@/components/Crud/CRUD.operation";
import udOperation from "@/components/Crud/UD.operation";
import user from "@/utils/userStore";

// crud交由presenter持有
const defaultForm = {
  id: null,
  name: null,
  nameZh: null,
  sort: 999,
  path: null,
  component: null,
  parentId: 0,
  icon: null,
  type: 0,
  permission: null,
  enabled: 1,
  children: [],
};
export default {
  name: "Menu",
  components: {
    Treeselect,
    IconSelect,
    crudOperation,
    rrOperation,
    udOperation,
  },
  cruds() {
    return CRUD({
      title: "菜单",
      url: "/api/menus",
      crudMethod: { ...crudMenu },
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      menus: [],
      permission: {
        add: ["admin", "menu:add"],
        edit: ["admin", "menu:edit"],
        del: ["admin", "menu:del"],
      },
      rules: {
        nameZh: [{ required: true, message: "请输入中文名称", trigger: "blur" }],
        path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
        permission: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
        component: [{ required: true, message: "请输入组件路径", trigger: "blur" }]
      },
    };
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.menus = [];
      // if (form.id != null) {
      //   if (form.parentId === null) {
      //     form.parentId = 0
      //   }
      //   // this.getSupDepts(form.id)
      // } else {
      this.menus.push({ id: 0, label: "顶级类目", children: null });
      // }
    },
    [CRUD.HOOK.afterValidateCU]() {
      if (this.form.type == 0) {
        this.form.component = 'Layout'
      }
      if (this.form.icon == null && this.form.type != 2) {
        this.form.icon = 'el-icon-add'
      }
      return true;
    },
    getMenus(tree, treeNode, resolve) {
      setTimeout(() => {
        crudMenu.getChild(tree.id).then((res) => {
          resolve(res.data);
        });
      }, 100);
    },
    // getSupDepts(id) {
    //   console.log("id", id);
    //   crudMenu.getChild(id).then((res) => {
    //     const children = res.data.map(function (obj) {
    //       if (!obj.children) {
    //         obj.children = null;
    //       }
    //       return { id: obj.id, label: obj.nameZh, children: obj.children };
    //     });
    //     this.menus = [{ id: 0, label: "顶级类目", children: children }];
    //   });
    // },
    loadMenus({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        crudMenu.getChild(parentNode.id).then((res) => {
          console.log('res', res)
          parentNode.children = res.data.map(function (obj) {
            console.log("obj", obj);
            if (obj.children.length == 0) {
              console.log("无儿子节点");
              return { id: obj.id, label: obj.nameZh };
            }
            return { id: obj.id, label: obj.nameZh, children: null };
          });
          setTimeout(() => {
            callback();
          }, 100);
        });
      }
    },
    // 选中图标
    selected(name) {
      this.form.icon = name;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
::v-deep .vue-treeselect__control,
::v-deep .vue-treeselect__placeholder,
::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
</style>
