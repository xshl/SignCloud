<template>
  <div class="login-container">
    <el-tabs
      v-model="activeName"
      class="login-tabs"
      type="card"
      :stretch="true"
    >
      <el-tab-pane label="账号密码登录" name="loginByAccount">
        <el-form
          ref="loginByAccountForm"
          :model="loginByAccountForm"
          class="login-form"
          :rules="loginByAccountRules"
        >
          <el-form-item prop="phone">
            <el-input
              ref="phone"
              v-model="loginByAccountForm.phone"
              type="text"
              placeholder="手机号码"
              auto-complete="on"
              clearable
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-user-solid input-icon"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginByAccountForm.password"
              :type="passwordType"
              placeholder="密码"
              auto-complete="on"
              show-password
              @keyup.enter.native="LoginByAccount"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-lock input-icon"
              ></i>
            </el-input>
          </el-form-item>
          <div class="login-checkbox">
            <el-checkbox
              v-model="loginByAccountForm.rememberMe"
              style="margin: 0 0 25px 0"
            >
              自动登录
            </el-checkbox>
            <a style="font-size: 14px; color: #409eff" href="login/register"
              >注册账号
            </a>
            <a
              style="font-size: 14px; color: #409eff"
              href="login/forgetPassword"
              >忘记密码？</a
            >
          </div>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="LoginByAccount"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机号登录" name="loginByPhone">
        <el-form
          ref="loginByPhoneForm"
          :model="loginByPhoneForm"
          class="login-form"
          :rules="loginByPhoneRules"
          auto-complete="on"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="loginByPhoneForm.phone"
              placeholder="手机号码"
              clearable
              ref="phone"
              autocomplete="on"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-mobile-phone input-icon"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input
              v-model="loginByPhoneForm.verificationCode"
              type="text"
              placeholder="验证码"
              style="width: 50%; margin-right: 10%"
              ref="verificationCode"
            >
            </el-input>
            <SendCode :phone="loginByPhoneForm.phone"></SendCode>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="LoginByPhone"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-divider content-position="center">第三方登录</el-divider>
    <div class="third" @click="loginByGithub">
      <div class="third-icon">
        <img src="../../assets/image/github.png" width="50px" />
      </div>
    </div>
  </div>
</template>

<script>
import { validPhone } from "@/utils/validate";
import SendCode from "@/components/SendCode";
export default {
  components: { SendCode },
  data() {
    return {
      activeName: "loginByAccount",
      loginByAccountForm: {
        phone: "",
        password: "",
        rememberMe: false,
      },
      loginByAccountRules: {
        phone: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginByPhoneForm: {
        phone: "",
        verificationCode: "",
      },
      loginByPhoneRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validPhone, trigger: "blur" },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      loading: false,
      passwordType: "password",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    LoginByAccount() {
      this.$refs.loginByAccountForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/loginByPwd", this.loginByAccountForm)
            .then(() => {
              this.$message.success("登录成功");
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$router.push("/home");
    },
    LoginByPhone() {
      this.$refs.loginByPhoneForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/loginByPhone", this.loginByPhoneForm)
            .then(() => {
              this.$message.success("登录成功");
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$router.push("/home");
    },
    loginByGithub() {
      window.location.href =
        "https://github.com/login/oauth/authorize?client_id=f733d49acafb50cac307&state=STATE&redirect_uri=http://localhost:8080/callback";
    },
  },
};
</script>

<style>
.login-container {
  width: 100%;
}
.login-tabs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.login-form {
  padding: 10px 0px 5px 0px;
}
.login-checkbox {
  display: flex;
  justify-content: space-between;
}
.login-checkbox label {
  margin: 0px 0px 15px;
}
.third {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.third-icon {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: #ccc 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.el-tabs--card > .el-tabs__header {
  width: 100%;
}
.el-tabs__content {
  width: 100%;
}
.el-button {
  padding: 12px 12px;
}
.el-divider__text {
  color: #aaa;
}
</style>