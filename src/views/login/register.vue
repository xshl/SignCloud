<template>
  <div>
    <el-page-header
      title="返回登录页面"
      @back="Back"
      style="color: #409eff"
    ></el-page-header>
    <div class="register">
      <el-form
        ref="registerForm"
        :model="registerForm"
        class="register-form"
        :rules="registerRules"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            ref="username"
            v-model="registerForm.username"
            placeholder="用户名"
            type="text"
            auto-complete="on"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            prefix-icon="iconfont icon-email"
            ref="email"
            v-model="registerForm.email"
            placeholder="邮箱"
            auto-complete="on"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="realname">
          <el-input
            prefix-icon="iconfont icon-name"
            ref="realname"
            v-model="registerForm.realname"
            placeholder="真实姓名"
            type="text"
            auto-complete="on"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            prefix-icon="iconfont icon-phone"
            v-model="registerForm.phone"
            placeholder="手机号码"
            clearable
            ref="phone"
            autocomplete="on"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="registerForm.code"
            type="text"
            placeholder="验证码"
            style="width: 50%; margin-right: 10%"
            ref="code"
          >
          </el-input>
          <el-button
            type="primary"
            style="width: 40%"
            :disabled="disabled"
            @click.native.prevent="getCode"
            >{{ btntxt }}</el-button
          >
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-password"
            ref="password"
            v-model="registerForm.password"
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
            v-model="registerForm.confirmPassword"
            placeholder="再次输入密码"
            auto-complete="on"
            show-password
            @keyup.enter.native="register"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="register()"
          >
            <span>注册</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validPhone, validPassword, validEmail } from "@/utils/validate";
import { register } from "@/api/user";
import { validPhoneNumber } from "./passport";
export default {
  data() {
    var validConfirmps = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        realname: "",
        phone: "",
        email: "",
        confirmPassword: "",
        code: "",
      },
      registerData: {
        username: "",
        password: "",
        realname: "",
        phone: "",
        email: "",
      },
      registerRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validPhone, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validPassword, trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validEmail, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validConfirmps, trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实名字", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      passwordType: "password",
      time: 0, // 验证码倒计时
      disabled: false, // 验证码按钮可用
      btntxt: "获取验证码", // 验证码按钮文字
      btnDisabled: true, // 注册按钮可用
    };
  },
  methods: {
    Back() {
      this.$router.back();
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        console.log(this.time);
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    getCode() {
      if (validPhoneNumber(this.registerForm.phone)) {
        var data = {
          phone: this.registerForm.phone,
          count: 4,
        };
        this.time = 60;
        this.timer();
        // var url = "/index/common/getVerificationCode";
        // this.$http
        //   .get(url, { params: data })
        //   .then((res) => {
        //     if (res.data.code == 200) {
        //       // console.log("验证码");
        //       // console.log(res.data);
        //       this.$message.success("发送成功");
        //       this.time = 60;
        //       this.disabled = true;
        //       this.timer();
        //     }
        //   })
        //   .catch((err) => {
        //     // console.log(err);
        //     this.$message.error("发送失败");
        //   });
      } else {
        console.log('手机号码格式错误')
      }
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.registerForm.validate);
      this.registerData.username = this.registerForm.username;
      this.registerData.realname = this.registerForm.realname;
      this.registerData.phone = this.registerForm.phone;
      this.registerData.password = this.registerForm.password;
      this.registerData.email = this.registerForm.email;
      console.log(this.registerData);
      // register(this.registerData).then((response) => {
      //   console.log(response);
      // }).catch(error => {
      //   console.log(error)
      // });
    },
  },
};
</script>

<style>
.register {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-form {
  padding: 10px 0px 5px 0px;
  width: 100%;
}

.el-button {
  padding: 12px 12px;
}
.el-input__prefix {
  width: 25px;
}
</style>