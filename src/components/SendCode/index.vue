<template>
  <el-button
    type="primary"
    style="width: 40%"
    :disabled="disabled"
    @click.native.prevent="getCode"
    >{{ btntxt }}</el-button
  >
</template>

<script>
import { getCode, loginByPhone, loginByGithub } from "@/api/user";
import { validPhoneNumber } from "./passport";
export default {
  props: {
    phone: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      time: 0, // 验证码倒计时
      disabled: false, // 验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字F
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
      if (validPhoneNumber(this.phone)) {
        getCode(this.phone)
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("发送成功");
              this.time = 60;
              this.disabled = true;
              this.timer();
            }
          })
          .catch((err) => {
            this.$message.error(res.message);
          });
      } else {
        this.$message.error("手机号码格式错误");
      }
    },
  },
};
</script>

<style>
</style>