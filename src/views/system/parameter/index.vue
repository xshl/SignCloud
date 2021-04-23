<template>
  <el-tabs v-model="activeName" style="padding-left: 2%; padding-top: 1%; padding-right: 2%">
    <el-tab-pane label="签到参数设置" name="first">
      <Params ref="params" />
    </el-tab-pane>
    <el-tab-pane label="签到等级设置" name="second">
      <Grade ref="grade" />
    </el-tab-pane>
  </el-tabs>
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