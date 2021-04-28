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
      <crudOperation :permission="permission" />
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
        label-width="80px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" style="width: 370px" />
        </el-form-item>
        <el-form-item label="权限描述" prop="code">
          <el-input v-model="form.description" style="width: 370px" />
        </el-form-item>
        <el-form-item label="权限路径" prop="code">
          <el-input v-model="form.uri" style="width: 370px" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
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
      :max-height="windowHeight * 0.69"
      v-loading="crud.loading"
      :data="crud.data"
      @selection-change="crud.selectionChangeHandler"
      style="width: 100%"
    >
      <el-table-column type="selection" width="25px" />
      <el-table-column prop="name" label="权限名称" align="center" />
      <el-table-column prop="uri" label="权限路径" align="center" />
      <el-table-column prop="description" label="权限描述" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="statusChange(scope.row, scope.row.status)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <!-- <el-table-column v-if="checkPer(['admin','dict:edit','dict:del'])" label="操作" width="130px" align="center" fixed="right"> -->
        <template slot-scope="scope">
          <udOperation :data="scope.row" :permission="permission" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import crudPerm from "@/api/system/permission";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";
import user from "@/utils/userStore";

const defaultForm = {
  id: 0,
  name: null,
  code: null,
  description: null,
  method: null,
  status: 0,
  uri: null,
};

export default {
  name: "Perm",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
  },
  cruds() {
    return [
      CRUD({
        title: "权限",
        url: "/api/perm/all",
        crudMethod: { ...crudPerm },
      }),
    ];
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    return {
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      imageUrl: "",
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        uri: [{ required: true, message: "请输入权限路径", trigger: "blur" }],
        description: [
          { required: true, message: "请输入权限描述", trigger: "blur" },
        ],
      },
      permission: {
        add: ["admin", "perm:add"],
        edit: ["admin", "perm:edit"],
        del: ["admin", "perm:del"],
      },
    };
  },
  methods: {
    statusChange(data, val) {
      crudPerm.edit(data).then((res) => {
        this.$notify({
          title: res.data,
          type: "success",
        });
      });
    },
  },
};
</script>

<style>
.el-checkbox,
.el-checkbox__input {
  display: flex;
}
</style>