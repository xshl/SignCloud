<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-input
          v-model="query.blurry"
          clearable
          size="small"
          placeholder="模糊搜索"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <rrOperation />
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane name="first" label="签到参数设置">
        <el-table
          ref="table"
          v-loading="crud.loading"
          lazy
          :load="getMenus"
          :data="crud.data"
          row-key="id"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            label="序号"
            prop="id"
            align="center"
          />
          <el-table-column prop="name" label="业务名称" align="center">
            <template slot-scope="scope">
              <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
            </template>
          </el-table-column>
          <el-table-column
            prop="scope"
            align="center"
            label="签到允许距离范围（m）"
          >
            <template slot-scope="scope">
              {{ scope.row.menuSort }}
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="score"
            label="每次签到经验值"
            align="center"
          />
          <el-table-column
            :show-overflow-tooltip="true"
            prop="classTime"
            label="一节课时间（min）"
            align="center"
          />
          <el-table-column prop="updateTime" label="更新时间" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <!-- <el-table-column v-if="checkPer(['admin','menu:edit','menu:del'])" label="操作" width="130px" align="center" fixed="right"> -->
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="second" label="出勤等级设置">
        <el-table
          ref="table"
          v-loading="crud.loading"
          lazy
          :load="getMenus"
          :data="crud.data"
          row-key="id"
        >
          <el-table-column label="序号" prop="id" align="center" />
          <el-table-column prop="grade" label="出勤等级名称" align="center">
          </el-table-column>
          <el-table-column prop="low" align="center" label="最低出勤率（>）%">
          </el-table-column>
          <el-table-column prop="high" label="最高出勤率（<=）%" />
          <el-table-column prop="updateTime" label="更新时间" />
          <el-table-column prop="createTime" label="创建日期" />
          <el-table-column label="操作" align="center">
            <!-- <el-table-column v-if="checkPer(['admin','menu:edit','menu:del'])" label="操作" width="130px" align="center" fixed="right"> -->
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--表格渲染-->
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
import DateRangePicker from "@/components/DateRangePicker";

// crud交由presenter持有
const defaultForm = {
  id: null,
  title: null,
  menuSort: 999,
  path: null,
  component: null,
  componentName: null,
  iframe: false,
  roles: [],
  pid: 0,
  icon: null,
  cache: false,
  hidden: false,
  type: 0,
  permission: null,
};
export default {
  name: "Menu",
  components: {
    Treeselect,
    IconSelect,
    crudOperation,
    rrOperation,
    udOperation,
    DateRangePicker,
  },
  cruds() {
    return CRUD({
      title: "菜单",
      url: "api/menus",
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
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        path: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      activeName: "first",
    };
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.menus = [];
      if (form.id != null) {
        if (form.pid === null) {
          form.pid = 0;
        }
        this.getSupDepts(form.id);
      } else {
        this.menus.push({ id: 0, label: "顶级类目", children: null });
      }
    },
    getMenus(tree, treeNode, resolve) {
      const params = { pid: tree.id };
      setTimeout(() => {
        crudMenu.getMenus(params).then((res) => {
          resolve(res.content);
        });
      }, 100);
    },
    getSupDepts(id) {
      crudMenu.getMenuSuperior(id).then((res) => {
        const children = res.map(function (obj) {
          if (!obj.leaf && !obj.children) {
            obj.children = null;
          }
          return obj;
        });
        this.menus = [{ id: 0, label: "顶级类目", children: children }];
      });
    },
    loadMenus({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        crudMenu.getMenusTree(parentNode.id).then((res) => {
          parentNode.children = res.map(function (obj) {
            if (!obj.leaf) {
              obj.children = null;
            }
            return obj;
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
    handleClick(tab, event) {
      console.log(tab, event);
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
.tabs {
  width: 100%;
}
</style>
