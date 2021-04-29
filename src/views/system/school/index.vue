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
    <!--表单组件-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="500px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="110px"
      >
        <el-form-item label="学校/院系名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="学校/院系排序" prop="sort">
          <el-input-number
            v-model.number="form.sort"
            :min="0"
            :max="999"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否为学校">
          <el-radio-group v-model="isSchool">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="isSchool == '0'"
          style="margin-bottom: 0"
          label="上级学校/学院"
          prop="parentId"
        >
          <treeselect
            v-model="form.parentId"
            :load-options="loadSchools"
            :options="schools"
            placeholder="选择上级学校/学院"
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
      :load="getSchoolDatas"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :data="crud.data"
      row-key="id"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="排序" prop="sort" />
      <el-table-column prop="createTime" label="创建日期" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <!-- <el-table-column v-if="checkPer(['admin','school:edit','school:del'])" label="操作" width="130px" align="center" fixed="right"> -->
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            :disabled-dle="scope.row.id === 1"
            msg="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import crudSchool from "@/api/system/school";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import CRUD, { presenter, header, form, crud } from "@/components/Crud/crud";
import rrOperation from "@/components/Crud/RR.operation";
import crudOperation from "@/components/Crud/CRUD.operation";
import udOperation from "@/components/Crud/UD.operation";

const defaultForm = {
  id: null,
  name: null,
  parentId: null,
  sort: 999,
  children: [
    null
  ]
};
export default {
  name: "School",
  components: {
    Treeselect,
    crudOperation,
    rrOperation,
    udOperation,
  },
  cruds() {
    return CRUD({
      title: "学校/院系",
      url: "api/sys/schools",
      crudMethod: { ...crudSchool },
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      schools: [],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sort: [
          {
            required: true,
            message: "请输入排序",
            trigger: "blur",
            type: "number",
          },
        ],
      },
      permission: {
        add: ["admin", "school:add"],
        edit: ["admin", "school:edit"],
        del: ["admin", "school:del"],
      },
      isSchool: 1
    };
  },
  methods: {
    getSchoolDatas(tree, treeNode, resolve) {
      const params = { parentId: tree.id };
      setTimeout(() => {
        crudSchool.getSchools(params).then((res) => {
          resolve(res.content);
        });
      }, 100);
    },
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      if (form.id != null) {
        this.getSupSchools(form.id);
      } else {
        this.getSchools();
      }
    },
    getSupSchools(id) {
      crudSchool.getSchoolSuperior(id).then((res) => {
        const date = res.content;
        this.buildSchools(date);
        this.Schools = date;
      });
    },
    buildSchools(schools) {
      Schools.forEach((data) => {
        if (data.children) {
          this.buildSchools(data.children);
        }
        if (data.hasChildren && !data.children) {
          data.children = null;
        }
      });
    },
    getSchools() {
      crudSchool.getSchools().then((res) => {
        console.log('data', res.data.content)
        this.schools = res.data.content.map(function (obj) {
          console.log('obj', obj)
          if (obj.hasChildren) {
            obj.children = null;
          }
          return obj;
        });
      });
    },
    // 获取弹窗内学校数据
    loadSchools({ action, parentNode, callback }) {
      console.log('action', action)
      if (action === LOAD_CHILDREN_OPTIONS) {
        console.log('加载弹窗数据')
        crudSchool
          .getSchools()
          .then((res) => {
            parentNode.children = res.data.content.map(val => {
              console.log('val', val)
              let obj = {}
              obj.label = val.parentId
              obj.children = val.children
              return obj
            })
            // parentNode.children = res.data.content.map(function (obj) {
            //   console.log('children', obj)
            //   if (obj.hasChildren) {
            //     obj.children = null;
            //   }
            //   return obj;
            // });
            setTimeout(() => {
              callback();
            }, 100);
          });
      }
    },
    // 提交前的验证
    [CRUD.HOOK.afterValidateCU]() {
      if (this.form.parentId !== null && this.form.parentId === this.form.id) {
        this.$message({
          message: "上级学校/院系不能为空",
          type: "warning",
        });
        return false;
      }
      if (this.form.isSchool === "1") {
        this.form.parentId = null;
      }
      return true;
    },
    checkboxT(row, rowIndex) {
      return row.id !== 1;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .vue-treeselect__control,
::v-deep .vue-treeselect__placeholder,
::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
