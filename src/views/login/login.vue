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
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginByAccountForm.username"
              type="text"
              placeholder="账号"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-user-solid input-icon"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginByAccountForm.password"
              type="password"
              placeholder="密码"
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
              v-model="loginByAccountForm.autoLogin"
              style="margin: 0 0 25px 0"
            >
              自动登录
            </el-checkbox>
            <a style="font-size: 14px" href="login/register">注册账号 </a>
            <a style="font-size: 14px" href="login/forgetPassword"
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
        >
          <el-form-item prop="phone">
            <el-input
              v-model="loginByPhoneForm.phone"
              type="number"
              placeholder="手机号码"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-mobile-phone input-icon"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="loginByPhoneForm.code"
              type="text"
              placeholder="验证码"
              style="width: 50%; margin-right: 10%"
            >
            </el-input>
            <el-button type="primary" style="width: 40%">发送验证码</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "loginByAccount",
      loginByAccountForm: {
        username: "",
        password: "",
        autoLogin: false,
      },
      loginByPhoneForm: {
        phone: "",
        code: "",
      },
      loading: false,
    };
  },
  methods: {
    LoginByAccount() {
      this.$router.push("/home");
    },
    LoginByPhone() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>
.login-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.el-tabs--card > .el-tabs__header {
  width: 100%;
}
.el-tabs__content {
  width: 100%;
}
</style>