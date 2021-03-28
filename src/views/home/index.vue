<template>
  <div></div>
</template>

<script>
import api from '@/api/test'

export default {
  data() {
    return {
      name: {}
    }
  },

  created() {
    // this.fetchData();
  },

  methods: {
    // fetchData() {
    //   api.test().then(response => {
    //     console.log(response)
    //     this.name = response.message;
    //   })
    // }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
