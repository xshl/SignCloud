<template>
  <div class="layout">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#ffffff"
    >
      <div class="logoSide">
        <img src="../assets/image/logo.png" class="logo" />
        <span v-if="!isCollapse" slot="title" style="color: #fff;">到云后台管理系统</span>
      </div>
      <el-menu-item index="1">
        <i class="el-icon-odometer"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户配置</span>
        </template>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">角色管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">内容管理</span>
        </template>
          <el-menu-item index="3-1">课程管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统管理</span>
        </template>
          <el-menu-item index="4-1">菜单管理</el-menu-item>
          <el-menu-item index="4-2">权限管理</el-menu-item>
          <el-menu-item index="4-3">数据字典</el-menu-item>
          <el-menu-item index="4-4">系统参数</el-menu-item>
          <el-menu-item index="4-5">学校机构</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-first-aid-kit"></i>
          <span slot="title">异常页</span>
        </template>
          <el-menu-item index="5-1">找不到页面</el-menu-item>
          <el-menu-item index="5-2">无权访问</el-menu-item>
          <el-menu-item index="5-3">服务器出错</el-menu-item>
      </el-submenu>
      <el-menu-item index="6">
        <i class="el-icon-warning-outline"></i>
        <span slot="title">关于</span>
      </el-menu-item>
    </el-menu>
    <div class="right">
      <el-breadcrumb separator="/" class="pageheader">
        <i v-if="!isCollapse" @click="open()" class="el-icon-s-unfold icon"></i>
        <i v-if="isCollapse" @click="open()" class="el-icon-s-fold icon"></i>
        <el-breadcrumb-item style="margin-left: 10px">首页</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; ">
        <div class="content">
          <span style="margin-top: 10%">admin,欢迎您进入本系统！</span>
          <span>点击左边功能模块使用本系统！</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import layout from "../components/layout";
export default {
  components: { layout },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goBack() {
      console.log("go back");
    },
    open() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
}
.logoSide {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 30px;
}
.logo {
  width: 32px;
  height: 32px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 15%;
  height: 100%;
}
.right {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}
.pageheader {
  height: 56px;
  width: 100%;
  box-shadow: 0px 1px 0px #ccc;
  padding-left: 20px;
  display: flex;
  align-items: center;
  background: #fff;
}
.icon {
  font-size: 25px;
}
.content {
  width: 95%;
  height: 95%;
  background-color: #fff;
  display: flex; 
  flex-direction: column;
  align-items: center; 
  font-size: 30px;
}
</style>