<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.keywords"
          size="small"
          clearable
          placeholder="模糊搜索"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.Query"
        />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" :deleteBtn="false" :editBtn="false"/>
    </div>
    <!-- 表单渲染 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="520px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="中文名称" prop="nameZh">
          <el-input v-model="form.nameZh" />
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-switch
            v-model="form.enabled"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="描述信息" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="菜单分配" prop="menus">
          <el-tree
            ref="menuinput"
            v-loading="loading"
            :data="menusData"
            :default-checked-keys="menusIds"
            :props="defaultProps"
            accordion
            show-checkbox
            node-key="id"
            @check="menuChange"
          />
        </el-form-item>
        <el-form-item label="权限分配" prop="perms">
          <el-select
            v-model="permDatas"
            style="width: 100%"
            multiple
            placeholder="请选择"
            @remove-tag="deleteTag"
            @change="changePerm"
          >
            <el-option
              v-for="item in perms"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <!-- <el-input v-model="form.roles" style="width: 370px" /> -->
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
    <el-row :gutter="15" type="flex">
      <!--角色管理-->
      <el-col
        :xs="24"
        :sm="24"
        :md="16"
        :lg="16"
        :xl="17"
        style="margin-bottom: 10px"
      >
        <el-card class="box-card" shadow="never">
          <el-table
            ref="table"
            v-loading="crud.loading"
            highlight-current-row
            :max-height="windowHeight"
            style="width: 100%"
            :data="crud.data"
            @selection-change="crud.selectionChangeHandler"
            @current-change="handleCurrentChange"
          >
            <el-table-column prop="nameZh" label="角色名称" align="center" />
            <el-table-column
              prop="enabled"
              label="状态"
              align="center"
              width="80px"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enabled"
                  :active-value="1"
                  :inactive-value="0"
                  @change="statusChange(scope.row, scope.row.enabled)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="description"
              label="描述"
              align="center"
            />
            <!-- <el-table-column
              :show-overflow-tooltip="true"
              width="135px"
              prop="createTime"
              label="创建日期"
            /> -->
            <!-- <el-table-column v-if="checkPer(['admin','roles:edit','roles:del'])" label="操作" width="130px" align="center" fixed="right"> -->
            <el-table-column
              label="操作"
              width="130px"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <udOperation :data="scope.row" :permission="permission" />
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-card>
      </el-col>
      <!-- 菜单选择 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip
              class="item"
              effect="dark"
              content="选择指定角色分配菜单"
              placement="top"
            >
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <!-- <el-button
              v-permission="['admin','roles:edit']"
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu"
            >保存</el-button> -->
            <el-button
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu"
              >保存</el-button
            >
          </div>
          <el-tree
            ref="menu"
            v-loading="loading"
            :data="menusData"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            accordion
            show-checkbox
            node-key="id"
            @check="menuChange"
          />
        </el-card>
      </el-col>
      <!-- 权限选择 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip
              class="item"
              effect="dark"
              content="选择指定角色分配权限"
              placement="top"
            >
              <span class="role-span">权限分配</span>
            </el-tooltip>
            <el-button
              :disabled="!showButton"
              :loading="permLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="savePerm"
              >保存</el-button
            >
          </div>
          <el-tree
            ref="perm"
            :data="perms"
            v-loading="loading"
            :default-checked-keys="permIds"
            :props="defaultPermProps"
            accordion
            show-checkbox
            node-key="id"
            @check="permChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crudRoles from "@/api/userConfig/role";
import { getPerm } from "@/api/system/permission";
import { getMenus, getChild, getMenusByRoles } from "@/api/system/menu";
import CRUD, { presenter, header, form, crud } from "@/components/Crud/crud";
import rrOperation from "@/components/Crud/RR.operation";
import crudOperation from "@/components/Crud/CRUD.operation";
import udOperation from "@/components/Crud/UD.operation";
import pagination from "@/components/Crud/Pagination";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import user from "@/utils/userStore";

const defaultForm = {
  id: null,
  name: null,
  nameZh: null,
  description: null,
  menus: [],
  perms: [],
  enabled: 1,
};
let userPerms = [];
export default {
  name: "Role",
  components: {
    Treeselect,
    pagination,
    crudOperation,
    rrOperation,
    udOperation,
  },
  cruds() {
    return CRUD({
      title: "角色",
      url: "/api/roles/roles",
      crudMethod: { ...crudRoles },
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  created() {
    getMenus().then((res) => {
      this.menusData = res.data.content;
    });
    getPerm().then((res) => {
      // this.permData = res.data.content;
      this.perms = res.data.content;
    });
  },
  data() {
    return {
      windowHeight: document.documentElement.clientHeight - 310,
      defaultProps: {
        children: "children",
        label: "nameZh",
        isLeaf: "hasChildren",
      },
      defaultPermProps: {
        children: "children",
        label: "name",
        isLeaf: "hasChildren",
      },
      currentId: 0,
      menuLoading: false,
      showButton: false,
      permLoading: false,
      showPermButton: false,
      menus: [],
      menusIds: [],
      menuIds: [],
      menusData: [],
      perms: [],
      permIds: [], // 多选时使用
      permDatas: [],
      roleForm: [],
      permission: {
        add: ["admin", "roles:add"],
        edit: ["admin", "roles:edit"],
        del: ["admin", "roles:del"],
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        nameZh: [
          { required: true, message: "请输入中文名称", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    changePerm(value) {
      userPerms = [];
      value.forEach(function (data, index) {
        const perm = { id: data };
        userPerms.push(perm);
      });
    },
    deleteTag(value) {
      userPerms.forEach(function (data, index) {
        if (data.id === value) {
          userPerms.splice(index, value);
        }
      });
    },
    // 触发单选
    handleCurrentChange(val) {
      this.roleForm = val;
      if (val) {
        const _this = this;
        // 清空菜单的选中
        this.$refs.menu.setCheckedKeys([]);
        // 保存当前的角色id
        this.currentId = val.id;
        // 初始化默认选中的key
        this.menuIds = [];
        this.permIds = [];
        getMenusByRoles(val.id).then((res) => {
          this.loading = true;
          res.data.content.forEach(function (data) {
            _this.menuIds.push(data.id);
          });
          this.$refs.menu.setCheckedKeys(this.menuIds);
        });
        crudRoles.getAll().then((res) => {
          const data = res.data.content;
          const _this = this;
          data.forEach(function (val) {
            if (val.id == _this.currentId) {
              val.perms.forEach(function (data) {
                _this.permIds.push(data.id);
              });
            }
          });
          this.$refs.perm.setCheckedKeys(this.permIds);
          this.loading = false;
        });
        this.showButton = true;
      }
    },
    menuChange(menu) {
      if (!this.showButton) {
        this.$message({
          message: "请选择修改角色",
          type: "warning",
        });
      }
    },
    permChange(perm) {
      if (!this.showButton) {
        this.$message({
          message: "请选择修改角色",
          type: "warning",
        });
      }
    },
    // 保存菜单
    saveMenu() {
      this.menuLoading = true;
      const _this = this;
      this.roleForm.menus = [];
      this.roleForm.perms = [];
      this.menuIds = this.$refs.menu.getCheckedKeys();
      this.menuIds.forEach(function (id) {
        const menu = { id: id };
        _this.roleForm.menus.push(menu);
      });
      crudRoles
        .edit(this.roleForm)
        .then((res) => {
          this.crud.notify("保存成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
          this.menuLoading = false;
          user.setMenu();
        })
        .catch((err) => {
          this.menuLoading = false;
        });
    },
    savePerm() {
      this.permLoading = true;
      const _this = this;
      this.roleForm.menus = [];
      this.roleForm.perms = [];
      this.permIds = this.$refs.perm.getCheckedKeys();
      this.permIds.forEach(function (id) {
        const perm = { id: id };
        _this.roleForm.perms.push(perm);
      });
      this.roleForm.modifier = user.getId();
      crudRoles
        .edit(this.roleForm)
        .then((res) => {
          this.crud.notify("保存成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
          this.permLoading = false;
        })
        .catch((err) => {
          this.permLoading = false;
        });
    },
    // 改变数据
    update() {
      // 无刷新更新 表格数据
      crudRoles.get(this.currentId).then((res) => {
        for (let i = 0; i < this.crud.data.length; i++) {
          if (res.id === this.crud.data[i].id) {
            this.crud.data[i] = res;
            break;
          }
        }
      });
    },
    statusChange(data, val) {
      data.perms = [];
      data.menus = [];
      crudRoles.edit(data).then((res) => {
        this.$notify({
          title: res.message,
          type: "success",
        });
      });
    },
    // 新增前将多选的值设置为空
    [CRUD.HOOK.beforeToAdd]() {
      this.permDatas = [];
      this.menusIds = []
    },
    // 初始化编辑时候的角色与岗位
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.permDatas = [];
      this.menusIds = []
      userPerms = [];
      const _this = this;
      form.menus.forEach(function (menu, index) {
        _this.menusIds.push(menu.id);
      })
      // _this.$refs.menuinput.setCheckedKeys(this.menusIds);
      form.perms.forEach(function (perm, index) {
        if (perm.status != 9) {
          _this.permDatas.push(perm.id);
          const rol = { id: perm.id };
          userPerms.push(rol);
        }
      });
    },
    [CRUD.HOOK.afterToCU](crud) {
      this.$refs.menuinput.setCheckedKeys(this.menusIds);
    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {
      if (this.permDatas.length === 0) {
        this.$message({
          message: "角色不能为空",
          type: "warning",
        });
        return false;
      }
      crud.form.perms = userPerms;
      this.menusIds = this.$refs.menuinput.getCheckedKeys();
      this.form.menus = []
      let _this = this
      this.menusIds.forEach(function (id) {
        const menu = { id: id };
        _this.form.menus.push(menu);
      });
      return true;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.role-span {
  font-weight: bold;
  color: #303133;
  font-size: 15px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
::v-deep .vue-treeselect__multi-value {
  margin-bottom: 0;
}
::v-deep .vue-treeselect__multi-value-item {
  border: 0;
  padding: 0;
}
.perm {
  display: flex;
  flex-direction: column;
  margin-bottom: 3px;
}
</style>
