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
        <crudOperation
          :permission="permission"
          :visible="activeName == 'second'"
        />
      </div>
    </div>
    <!-- 签到参数设置表单组件 -->
    <!-- <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible="true" :title="crud.status.title" width="500px"> -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="500px"
      v-if="activeName == 'first'"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="paramRules"
        size="small"
        label-width="156px"
      >
        <el-form-item label="业务名称" prop="name">
          <el-select v-model="form.name" placeholder="请选择">
            <el-option label="手势签到" value="1"></el-option>
            <el-option label="一键签到" value="2"></el-option>
            <el-option label="限时签到" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签到允许距离范围(m)" prop="scope">
          <el-input v-model="form.scope" />
        </el-form-item>
        <el-form-item label="每次签到经验值" prop="score">
          <el-input v-model="form.score" />
        </el-form-item>
        <el-form-item label="一节课时间(min)" prop="classTime">
          <el-input v-model="form.classTime" />
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
    <!-- 出勤等级设置表单组件 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="500px"
      v-if="activeName == 'second'"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="gradeRules"
        size="small"
        label-width="156px"
      >
        <el-form-item label="等级名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="出勤率范围(%）" prop="scope">
          <el-slider v-model="form.scope" range></el-slider>
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
    <!-- 参数列表 -->
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
          <el-table-column prop="grade" label="出勤等级名称" align="center" />
          <el-table-column prop="low" label="最低出勤率（<=）%" />
          <el-table-column prop="high" label="最高出勤率（<=）%" />
          <el-table-column prop="updateTime" label="更新时间" />
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
      paramRules: {
        name: [{ required: true, message: "请选择业务名称", trigger: "blur" }],
        scope: [
          {
            required: true,
            message: "请输入签到允许距离范围",
            trigger: "blur",
          },
        ],
        score: [
          { required: true, message: "请选择每次签到经验值", trigger: "blur" },
        ],
        classTime: [
          { required: true, message: "请输入一节课时间", trigger: "blur" },
        ],
      },
      gradeRules: {
        name: [{ required: true, message: "请输入等级名称", trigger: "blur" }],
        scope: [
          { required: true, message: "请选择出勤率范围", trigger: "blur" },
        ],
      },
      grade: [
        {
          name: "",
          scope: [0, 100],
        },
      ],
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
    addGrade() {
      const gradechild = {
        name: "",
        scope: [0, 100],
      };
      gradechild.scope[0] = this.grade[this.grade.length - 1].scope[1];
      console.log(gradechild);
      this.grade.push(gradechild);
      console.log(this.$refs.scope.data.secondValue)
      
    },
    changeScope(index) {
      // if (index != this.grade.length && index != 0) {
      //   this.grade[index + 1].scope[0] = this.grade[index].scope[1];
      //   this.grade[index - 1].scope[1] = this.grade[index].scope[0];
      // } else if (index == 0 && index != this.grade.length) {
      //   this.grade[index + 1].scope[0] = this.grade[index].scope[1];
      // } else if (index == this.grade.length && index != 0) {
      //   this.grade[index - 1].scope[1] = this.grade[index].scope[0];
      // }
      // console.log(this.grade);
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
.el-slider__runway.show-input {
  margin-left: 0;
}
.add {
  width: 80%;
  margin-left: 10%;
  height: 40px;
}
</style>
