<template>
  <div class="additional">
    <div class="container">
      <h3 style="color: #409eff; text-align: center">完善信息</h3>
      <el-steps
        :active="active"
        simple
        process-status="finish"
        align-center
        style="padding-left: 86px; width: 100%"
      >
        <el-step title="绑定手机号" icon="el-icon-mobile-phone"></el-step>
        <el-step title="设置密码" icon="el-icon-lock"></el-step>
      </el-steps>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="form"
        v-if="active == 0"
      >
        <el-form-item prop="phone">
          <el-input
            ref="phone"
            v-model="form.phone"
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
        <el-form-item prop="verificationCode">
          <el-input
            v-model="form.verificationCode"
            type="text"
            placeholder="验证码"
            style="width: 50%; margin-right: 10%"
            ref="verificationCode"
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
        <el-form-item style="width: 100%">
          <el-button
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="next"
          >
            <span>下一步</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="form"
        v-if="active == 1"
      >
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-password"
            ref="password"
            v-model="form.password"
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
            v-model="form.confirmPassword"
            placeholder="再次输入密码"
            auto-complete="on"
            show-password
            @keyup.enter.native="complete"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="before"
          >
            <span>上一步</span>
          </el-button>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="complete"
          >
            <span>完成</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validPhone, validPassword } from "@/utils/validate";
import { validPhoneNumber } from "./login/passport";
import { getCode, additional } from "@/api/user";
export default {
  created() {
    
      console.log('githubId', this.$route.query.githubId["githubId"])
  },
  data() {
    var validConfirmps = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      form: {
        phone: "",
        verificationCode: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validPhone, trigger: "blur" },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validPassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validConfirmps, trigger: "blur" },
        ],
      },
      time: 0, // 验证码倒计时
      disabled: false, // 验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字
    };
  },
  methods: {
    timer() {
      if (this.time > 0) {
        this.time--;
        // console.log(this.time);
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    getCode() {
      if (validPhoneNumber(this.form.phone)) {
        
        getCode(this.form.phone)
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              console.log("验证码");
              console.log(res.data);
              this.$message.success("发送成功");
              this.time = 60;
              this.disabled = true;
              this.timer();
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(res.message);
          });
      } else {
        this.$message.error("手机号码格式错误");
        console.log("手机号码格式错误");
      }
    },
    before() {
      this.active = 0;
    },
    next() {
      this.active = 1;
    },
    complete() {
      const params = {
        phone: this.form.phone,
        githubId: this.$route.query.githubId["githubId"],
        verificationCode: this.form.verificationCode,
        password: this.form.password,
      };
      console.log("完善信息完成");
      additional(params).then((res) => {
        console.log("res", res);
        this.$store
          .dispatch("user/loginByGithub", res.data)
          .then(() => {
            this.$router.push({ path: this.redirect || "/" });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style>
.additional {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.container {
  width: 500px;
  height: 400px;
  border: #ddd 1px solid;
  border-radius: 10px;
}
.form {
  margin: auto;
  width: 70%;
}
.form-item {
  margin-top: 10px;
}
</style>