<template>
  <div class="container">
    <el-card class="cardContent">
      <img
        v-if="userInfo.avatar"
        :src="userInfo.avatar"
        width="100px"
        class="avatar"
      />
      <img v-else :src="avatar" width="100px" />
      <h2>{{ userInfo.username }}</h2>
      <div v-if="edit">
        <div class="text">学号：{{ userInfo.ino }}</div>
        <div class="text">用户身份：
          <el-tag
            v-for="role in userInfo.roles"
            size="mini"
            :key="role"
            style="margin-left: 3px"
            >{{ role }}</el-tag
          >
        </div>
        <div class="text">手机号码：{{userInfo.phone}}</div>
        
      </div>
    </el-card>
  </div>
</template>

<script>
import user from "@/utils/userStore";
import avatar from "@/assets/image/avatar.png";
export default {
  created() {
    console.log("user", this.userInfo);
  },
  data() {
    return {
      userInfo: user.getUser(),
      edit: true,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.cardContent {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  border-radius: 5px;
}
.avatar {
  border-radius: 50px;
}
.el-card__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 16px;
  margin-top: 8%;
}
</style>