<template>
  <div style="padding-left: 2%; padding-top: 1%; padding-right: 2%">
      <Params ref="params" />
  </div>
</template>

<script>
import Params from './params'
import Grade from './grade'
export default {
  name: 'paramter',
  components: { Params, Grade },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
  }
}
</script>

<style>
</style>