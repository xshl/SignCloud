<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <router-view :key="key" /> -->
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  <footer class="a-footer">copyright @ 2021 福州大学 SignCloud 工程实践2班06组</footer>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.hasTagsView {
  .app-main {
    min-height: calc(100vh - 84px);
  }
  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
.a-footer {
  bottom: 0px;
  color: gray;
  position: absolute;
  background: none repeat scroll 0 0 white;
  border-top: 1px solid #e7eaec;
  overflow: hidden;
  padding: 10px 6px 0 6px;
  height: 33px;
  font-size: 0.7rem !important;
  color: #7a8b9a;
  letter-spacing: 0.8px;
  font-family: Arial, sans-serif !important;
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
