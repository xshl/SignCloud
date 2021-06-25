<template>
  <div class="app-container">
    <div class="head-container">
      <crudOperation :permission="permission" :deleteBtn="false" :editBtn="false"/>
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
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" />
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
      <el-table-column prop="id" label="课程id" align="center" width="200px"/>
      <el-table-column prop="name" label="课程名称" align="center" />
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
import crudSubject from "@/api/content/subject";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";
import data from "@/utils/data";
import user from "@/utils/userStore";

const defaultForm = {
  id: 0,
  name: null,
};

export default {
  name: "Subject",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
  },
  cruds() {
    return [
      CRUD({
        title: "课程",
        url: "/api/subjects",
        crudMethod: { ...crudSubject },
      }),
    ];
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    return {
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      imageUrl: "",
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
      },
      permission: {
        add: ["admin", "subject:add"],
        edit: ["admin", "subject:edit"],
        del: ["admin", "subject:del"],
      },
      method: data.method,
    };
  },
  methods: {
    statusChange(data, val) {
      crudPerm.edit(data).then((res) => {
        this.$notify({
          title: res.message,
          type: "success",
        });
      });
    }
  },
};
</script>

<style lang="scss">
.el-checkbox,
.el-checkbox__input {
  display: flex;
}
</style>