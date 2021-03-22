<template>
  <div class="container">
    <div class="login">
      <div class="title">到云后台管理系统</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  background-image: url(../../assets/image/login.png);
  background-size: cover;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login {
  width: 350px;
  background: #ffffff;
  border-radius: 10px;
  padding: 25px 25px 25px;
}
.title {
  margin: 0 auto 20px auto;
  text-align: center;
  color: #3582f8;
  font-size: 15pt;
  font-weight: bold;
}
</style>