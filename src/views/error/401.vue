<template>
  <div class="wscn-http401-container">
    <div class="wscn-http401">
      <div class="pic-401">
        <img
          class="pic-401__parent"
          src="@/assets/image/error/401.png"
          alt="403"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">401</div>
        <div class="bullshit__headline">{{ message }}</div>
        <a href="/home" class="bullshit__return-home">回到首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page401",
  computed: {
    message() {
      return "抱歉，您没有权限查看，请联系管理员";
    },
  },
};
</script>

<style lang="scss" scoped>
.wscn-http401-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
.wscn-http401 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  .pic-401 {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 350px;
    padding: 30px 0;
    overflow: hidden;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 350px;
    &__oops {
      font-size: 128px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 50px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
