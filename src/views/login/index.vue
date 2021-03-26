<template>
  <div class="container">
    
      <div class="title-container">
        <h3 class="title">SignCloud后台管理系统</h3>
      </div>
    <div class="login">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>

$light_gray:#eee;

.container {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/image/login.png);
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .login {
    width: 350px;
    background: #ffffff;
    border-radius: 10px;
    padding: 25px 25px 25px;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
