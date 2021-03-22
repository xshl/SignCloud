<template>
  <div>
    <div :class="{ 'has-logo': showLogo }">
      <logo v-if="showLogo" :collapse="isCollapse"></logo>
    </div>
  </div>
</template>

<script>
import logo from "./logo";
export default {
  components: { logo },
  computed: {
    showLogo() {
      //return this.$store.state.settings.sidebarLogo;
      return true;
    },
    isCollapse() {
      //return !this.sidebar.opened;
      return true;
    },
  },
};
</script>

<style>
</style>