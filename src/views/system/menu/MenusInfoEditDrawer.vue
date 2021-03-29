<template>

  <el-drawer title="菜单信息修改" 
  size="30%" 
  :visible.sync="dialogVisible" 
  :modal-append-to-body="false"
  style="height:100%;"
  >
    <menus-info-form ref="editform" v-bind:editable="true" :data="info" :loading="showLoading"
    @success-edit="successEdit">
    </menus-info-form>

    <div class="demo-drawer__footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click.native.prevent="Submit"
      :loading="showLoading">提 交</el-button>
    </div>
  </el-drawer>
  
</template>

<script>

  
  import MenusInfoForm from './MenusInfoForm'

  export default {
    name: 'MenusInfoEditDrawer',
    components: {MenusInfoForm},
    data () {
      return {
        info: {},
        dialogVisible: false,
        showLoading: false
      }
    },
    methods: {
      init (row) {
        this.loadingStart();
        this.info=Object.assign({},row);
        this.loadingEnd();
      },
      open (row) {
        this.init(row);
        this.dialogVisible = true;
      },
      loadingStart () {
        this.showLoading = true;
      },
      loadingEnd () {
        this.showLoading = false;
      },
      successEdit(flag){
          if(flag){
            this.loadingEnd()
            this.dialogVisible=false
          }
          this.$emit("needfresh",true)
      },
      Submit(){
          // console.log(this.$refs.editform)
          this.$refs.editform.submit()
      }
    },
    
  }
</script>

<style scoped>

</style>

