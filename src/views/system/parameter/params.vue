<template>
  <div>
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
        <el-form-item label="签到允许距离范围(m)" prop="signinRange">
          <el-input v-model="form.signinRange" />
        </el-form-item>
        <el-form-item label="每次签到经验值" prop="signinExperience">
          <el-input v-model="form.signinExperience" />
        </el-form-item>
        <el-form-item label="一节课时间(min)" prop="classTime">
          <el-input v-model="form.classTime" />
        </el-form-item>
        <el-form-item label="优秀（>=）" prop="classTime">
          <el-input v-model="form.level1" />
        </el-form-item>
        <el-form-item label="良好（>=）" prop="classTime">
          <el-input v-model="form.level2" />
        </el-form-item>
        <el-form-item label="及格（>=）" prop="classTime">
          <el-input v-model="form.level3" />
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
      <el-table-column
        prop="signinRange"
        label="签到允许距离范围(m)"
        align="center"
      />
      <el-table-column prop="signinExperience" label="每次签到经验值" align="center" />
      <el-table-column prop="classTime" label="一节课时间" align="center" />
      <el-table-column prop="updateTime" label="更新时间" align="center" />
      <el-table-column prop="level1" label="优秀（>=）" align="center" />
      <el-table-column prop="level2" label="良好（>=）" align="center" />
      <el-table-column prop="level3" label="及格（>=）" align="center" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <!-- <el-table-column v-if="checkPer(['admin','dict:edit','dict:del'])" label="操作" width="130px" align="center" fixed="right"> -->
        <template slot-scope="scope">
          <el-button :loading="crud.status.cu === 2" size="mini" type="primary" icon="el-icon-edit" @click="crud.toEdit(scope.row)" />
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

const defaultForm = {
  id: null,
  signinExperience: null,
  signinRange: null,
  classTime: null,
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
      title: "签到参数",
      url: "/api/params",
      crudMethod: { ...crudParams },
    });
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    return {
      rules: {
        signinExperience: [
          { required: true, message: "请输入每次签到经验值", trigger: "blur" },
        ],
        signinRange: [
          {
            required: true,
            message: "请输入签到允许距离范围",
            trigger: "blur",
          },
        ],
        classTime: [
          { required: true, message: "请输入一节课时间", trigger: "blur" },
        ],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
    };
  },
  methods: {},
};
</script>

<style>
</style>