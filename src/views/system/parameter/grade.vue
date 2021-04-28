<template>
  <div>
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <el-input
          v-model="query.blurry"
          clearable
          size="samll"
          placeholder="模糊搜索"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        ></el-input>
        <rrOperation />
      </div>
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
        <el-form-item label="签到允许距离范围(m)" prop="value1">
          <el-input v-model="form.value2" />
        </el-form-item>
        <el-form-item label="每次签到经验值" prop="value2">
          <el-input v-model="form.value1" />
        </el-form-item>
        <el-form-item label="一节课时间(min)" prop="value3">
          <el-input v-model="form.value3" />
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
        prop="value2"
        label="签到允许距离范围(m)"
        align="center"
      />
      <el-table-column prop="value1" label="每次签到经验值" align="center" />
      <el-table-column prop="value3" label="一节课时间" align="center" />
      <el-table-column prop="updateTime" label="更新时间" align="center" />
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

const defaultForm = {
  id: null,
  value1: null,
  value2: null,
  value3: null,
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
        value1: [
          { required: true, message: "请输入每次签到经验值", trigger: "blur" },
        ],
        value2: [
          {
            required: true,
            message: "请输入签到允许距离范围",
            trigger: "blur",
          },
        ],
        value3: [
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