<template>
  <div class="container">
      <img src="../assets/image/success.png" width="300px" />
      <h1>授权成功，正在跳转...</h1>
      </div>
</template>

<script>
import { loginByGithub } from "@/api/user";
export default {
  created() {
    console.log("创建页面");
    console.log(this.$route.query);
    loginByGithub(this.$route.query).then((res) => {
      console.log("res", res);
      console.log(res.code == 406);
      if (res.code == 406) {
        this.$router.push({
          path: "/additional",
          query: { githubId: res.data },
        });
      } else {
        console.log("跳转到首页");
      }
    });
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  border: none;
}
</style>