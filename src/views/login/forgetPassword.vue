<template>
  <div>
    <el-page-header
      title="返回登录页面"
      @back="Back"
      style="color: #409eff"
    ></el-page-header>
    <div class="forgetPassword">
      <el-form
        ref="forgetPasswordForm"
        :model="forgetPasswordForm"
        class="forgetPassword-form"
        :rules="forgetPasswordRules"
      >
        <el-form-item prop="phone">
          <el-input
            prefix-icon="iconfont icon-phone"
            v-model="forgetPasswordForm.phone"
            placeholder="手机号码"
            clearable
            ref="phone"
            autocomplete="on"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-input
            v-model="forgetPasswordForm.verificationCode"
            type="text"
            placeholder="验证码"
            style="width: 50%; margin-right: 10%"
            ref="verificationCode"
          >
          </el-input>
          <SendCode :phone="forgetPasswordForm.phone"></SendCode>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-password"
            ref="password"
            v-model="forgetPasswordForm.password"
            placeholder="密码为数字、字母、字符其中至少两个"
            auto-complete="on"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            prefix-icon="iconfont icon-password"
            ref="confirmPassword"
            v-model="forgetPasswordForm.confirmPassword"
            placeholder="再次输入密码"
            auto-complete="on"
            show-password
            @keyup.enter.native="forgetPassword"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="forgetPassword"
          >
            <span>重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validPhone, validPassword } from "@/utils/validate";
import { forgetPassword } from "@/api/user";
import SendCode from '@/components/SendCode'
export default {
  components: { SendCode },
  data() {
    var validConfirmps = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetPasswordForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      forgetPasswordForm: {
        password: "",
        phone: "",
        confirmPassword: "",
        verificationCode: "",
      },
      forgetPasswordRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validPhone, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validPassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validConfirmps, trigger: "blur" },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      passwordType: "password",
      time: 0, // 验证码倒计时
      disabled: false, // 验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字
    };
  },
  methods: {
    Back() {
      this.$router.back();
    },
    forgetPassword() {
      this.$refs.forgetPasswordForm.validate((valid) => {
        const user = {
          phone: this.forgetPasswordForm.phone,
          password: this.forgetPasswordForm.password,
          verificationCode: this.forgetPasswordForm.verificationCode,
        };
        if (valid) {
          forgetPassword(user)
            .then((response) => {
              this.$message.success("修改成功");
              this.Back();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.forgetPassword {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>