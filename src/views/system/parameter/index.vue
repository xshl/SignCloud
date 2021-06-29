<template>
  <div class="app-container">
    <div class="head-container">
      <crudOperation :permission="permission" />
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
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="156px"
      >
        <el-form-item label="名称" prop="nameZh">
          <el-input v-model="form.nameZh" />
        </el-form-item>
        <el-form-item label="关键字" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="form.value" />
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
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%"
    >
      <el-table-column prop="nameZh" label="名称" align="center" />
      <el-table-column prop="name" label="关键字" align="center" />
      <el-table-column prop="value" label="值" align="center" />
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
import crudParams from "@/api/system/param";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";
import user from "@/utils/userStore";

const defaultForm = {
  id: null,
  name: null,
  nameZh: null,
  value: null,
};

export default {
  name: "Dict",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
  },
  cruds() {
    return CRUD({
      title: "参数系统",
      url: "/api/params/ids",
      crudMethod: { ...crudParams },
    });
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    var valueIsUnique = (rule, value, callback) => {
      if (value == "" || value == undefined || value == null) {
        callback();
      } else if (this.isUnique(value)) {
        callback(new Error("参数关键词重复"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        nameZh: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
        name: [
          {
            required: true,
            message: "请输入参数关键字",
            trigger: "blur",
          },
          // { validator: valueIsUnique, trigger: "blur" },
        ],
        value: [{ required: true, message: "请输入参数值", trigger: "blur" }],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
    };
  },
  methods: {
    isUnique(value) {
      const data = this.crud.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == value) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style>
</style>