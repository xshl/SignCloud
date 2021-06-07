<template>
  <div class="setting-container">
    <el-card style="width: 700px">
      <div style="font-size: 14px; font-weight: bold; margin-bottom: 40px">
        系统参数设置
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="156px"
        style="margin-left: 5%"
      >
        <el-form-item label="签到允许距离范围(m)" prop="signinRange">
          <el-input v-model="form.signinRange" style="width: 400px" />
        </el-form-item>
        <el-form-item label="每次签到经验值" prop="signinExperience">
          <el-input v-model="form.signinExperience" style="width: 400px" />
        </el-form-item>
        <el-form-item label="一节课时间(min)" prop="classTime">
          <el-input v-model="form.classTime" style="width: 400px" />
        </el-form-item>
        <el-form-item label="默认密码" prop="defaultPwd">
          <el-input v-model="form.defaultPwd" style="width: 400px" />
        </el-form-item>
        <el-form-item label="优秀（出勤率>=）" prop="level1">
          <el-input v-model="form.level1" style="width: 400px" />
        </el-form-item>
        <el-form-item label="良好（出勤率>=）" prop="level2">
          <el-input v-model="form.level2" style="width: 400px" />
        </el-form-item>
        <el-form-item label="及格（出勤率>=）" prop="level3">
          <el-input v-model="form.level3" style="width: 400px" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-input
            v-model="form.updateTime"
            style="width: 400px"
            :disabled="true"
          />
        </el-form-item>
      </el-form>
      <div class="submit">
        <el-button
          :loading="crud.status.cu === 2"
          type="primary"
          @click="submit"
          >修改</el-button
        >
      </div>
    </el-card>
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
import { formatData } from "@/utils/formatData";
import { validateNumber } from "@/utils/validate";

const defaultForm = {
  id: null,
  signinExperience: null,
  signinRange: null,
  classTime: null,
};

export default {
  name: "Param",
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
  created() {
    crudParams.getParams().then((res) => {
      this.form = res.data;
      this.form.updateTime = this.form.updateTime.substring(0,10) + " " + this.form.updateTime.substring(11,19)
      console.log('time', this.form.updateTime)
    });
  },
  data() {
    return {
      rules: {
        signinExperience: [
          { required: true, message: "请输入每次签到经验值", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" },
        ],
        signinRange: [
          {
            required: true,
            message: "请输入签到允许距离范围",
            trigger: "blur",
          },
          { validator: validateNumber, trigger: "blur" },
        ],
        classTime: [
          { required: true, message: "请输入一节课时间", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" },
        ],
        defaultPwd: [
          { required: true, message: "请输入默认密码", trigger: "blur" },
        ],
        level1: [
          { required: true, message: "请输入优秀出勤率", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" },
        ],
        level2: [
          { required: true, message: "请输入良好出勤率", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" },
        ],
        level3: [
          { required: true, message: "请输入及格出勤率", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" },
        ],
      },
      permission: {
        add: ["admin", "param:add"],
        edit: ["admin", "param:edit"],
        del: ["admin", "param:del"],
      },
    };
  },
  methods: {
    submit() {
      crudParams.edit(this.form).then((res) => {
        this.crud.notify("修改成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
      });
    },
  },
};
</script>

<style>
.setting-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 40px 80px 65px 80px;
  width: 100%;
}
.submit {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>