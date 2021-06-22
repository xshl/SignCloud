<template>
  <div class="app-container">
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <el-input
          v-model="query.keywords"
          clearable
          size="samll"
          placeholder="模糊搜索"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.Query"
        ></el-input>
        <rrOperation />
      </div>
      <crudOperation :permission="permission" :deleteBtn="false" :editBtn="false" />
    </div>
    <!-- <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible="true" :title="crud.status.title" width="500px"> -->
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
        label-width="100px"
      >
        <el-form-item label="学号/工号" prop="ino">
          <el-input v-model="form.ino" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" style="width: 180px" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" style="width: 180px" />
        </el-form-item>
        <el-form-item label="学校-学院" prop="school" style="width: 350px">
          <el-cascader
            :options="school"
            v-model="schoolData"
            placeholder="单选可搜索"
            filterable
            clearable
            style="width: 100%"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="角色" prop="roles" style="width: 350px">
          <el-select
            v-model="roleDatas"
            style="width: 100%"
            multiple
            placeholder="请选择"
            @remove-tag="deleteTag"
            @change="changeRole"
          >
            <el-option
              v-for="item in roles"
              :key="item.nameZh"
              :label="item.nameZh"
              :value="item.id"
            />
          </el-select>
          <!-- <el-input v-model="form.roles" style="width: 370px" /> -->
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-switch
            v-model="form.enabled"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
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
    <el-table
      ref="table"
      :max-height="windowHeight"
      v-loading="crud.loading"
      :data="crud.data"
      @selection-change="crud.selectionChangeHandler"
      style="width: 100%"
    >
      <el-table-column prop="ino" label="学号/工号" align="center" />
      <el-table-column prop="username" label="姓名" align="center" />
      <el-table-column prop="phone" label="手机号码" align="center" />
      <el-table-column label="学校-学院" align="center" prop="school">
        <template slot-scope="scope">
          {{ scope.row.school }}/{{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色" align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="role in scope.row.roles"
            :key="role.id"
            size="mini"
            style="margin-left: 3px"
            >{{ role.nameZh }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="enabled" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            :active-value="1"
            :inactive-value="0"
            @change="statusChange(scope.row, scope.row.enabled)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <!-- <el-table-column v-if="checkPer(['admin','dict:edit','dict:del'])" label="操作" width="130px" align="center" fixed="right"> -->
        <template slot-scope="scope">
          <udOperation :data="scope.row" :permission="permission" :deleteBtn="false" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import crudUser from "@/api/userConfig/user";
import { getAll } from "@/api/userConfig/role";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";
import { validPhone } from "@/utils/validate";
import user from "@/utils/userStore";
import curdSchool from "@/api/system/school";
import school from "@/api/system/school";

let userRoles = [];
const defaultForm = {
  id: 0,
  username: null,
  ino: null,
  roles: [],
  password: "123456",
  enabled: 1,
  salt: null,
  phone: null,
};

export default {
  name: "User",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
  },
  cruds() {
    return [
      CRUD({
        title: "用户",
        url: "/api/admins/users",
        crudMethod: { ...crudUser },
      }),
    ];
  },
  created() {
    this.crud.msg.add = "新增成功，默认密码：123456";
    console.log('屏幕高度', this.windowHeight)
    curdSchool.getSchools().then((res) => {
      var data = res.data.content;
      for (var i = 0; i < data.length; i++) {
        if (data[i].hasChildren) {
          var s = {
            value: data[i].name,
            label: data[i].name,
            children: [],
          };

          for (var j = 0; j < data[i].children.length; j++) {
            var c = {
              value: data[i].children[j].name,
              label: data[i].children[j].name,
            };
            s.children.push(c);
          }
        } else {
          var s = {
            value: data[i].name,
            label: data[i].name,
          };
        }
        this.school.push(s);
      }
      // this.school = res.data.content;
      console.log("this.school", this.school);
    });
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    return {
      windowHeight: document.documentElement.clientHeight-310, //实时屏幕高度
      roles: [],
      defaultProps: { children: "children", label: "name", isLeaf: "leaf" },
      rules: {
        username: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: validPhone, trigger: "blur" },
        ],
        ino: [
          { required: true, message: "请输入学号/工号", trigger: "blur" },
        ],
        // roles: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      permission: {
        add: ["admin", "user:add"],
        edit: ["admin", "user:edit"],
        del: ["admin", "user:del"],
      },
      roleDatas: [],
      school: [],
      schoolData: [],
    };
  },
  methods: {
    changeRole(value) {
      userRoles = [];
      value.forEach(function (data, index) {
        const role = { id: data };
        userRoles.push(role);
      });
    },
    deleteTag(value) {
      userRoles.forEach(function (data, index) {
        if (data.id === value) {
          userRoles.splice(index, value);
        }
      });
    },
    statusChange(data, val) {
      crudUser.edit(data).then((res) => {
        this.$notify({
          title: res.message,
          type: "success",
        });
      });
    },
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getRoles();
    },
    // 新增前将多选的值设置为空
    [CRUD.HOOK.beforeToAdd]() {
      this.roleDatas = [];
    },
    // 初始化编辑时候的角色与岗位
    [CRUD.HOOK.beforeToEdit](crud, form) {
      if (this.form.school) {
        this.schoolData = [];
        this.schoolData.push(this.form.school);
      }
      if (this.form.major) {
        this.schoolData.push(this.form.major);
      }
      this.roleDatas = [];
      userRoles = [];
      const _this = this;
      form.roles.forEach(function (role, index) {
        _this.roleDatas.push(role.id);
        const rol = { id: role.id };
        userRoles.push(rol);
      });
    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {
      if (this.roleDatas.length === 0) {
        this.$message({
          message: "角色不能为空",
          type: "warning",
        });
        return false;
      }
      crud.form.roles = userRoles;
      return true;
    },
    [CRUD.HOOK.beforeSubmit](curd, form) {
      if (this.schoolData.length == 1) {
        this.form.school = this.schoolData[0];
      } else if (this.schoolData.length == 2) {
        this.form.school = this.schoolData[0];
        this.form.major = this.schoolData[1];
      }
      this.schoolData = []
    },
    getRoles() {
      getAll()
        .then((res) => {
          this.roles = res.data.content;
        })
        .catch(() => {});
    },
    checkboxT(row, rowIndex) {
      return row.id !== this.user.id;
    },
  },
};
</script>

<style>
.el-checkbox,
.el-checkbox__input {
  display: flex;
}
::v-deep .vue-treeselect__control,
::v-deep .vue-treeselect__placeholder,
::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
</style>