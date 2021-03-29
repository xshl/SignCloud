<template>
  <el-dialog
    title="添加菜单"
    :visible.sync="addDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="addDialogClosed"
  >
    <el-form :model="addDialogForm" :rules="rules" ref="addDialogForm" label-width="80px">
      <el-form-item label="菜单代码" prop="name">
        <el-input v-model="addDialogForm.name" placeholder="请输入菜单代码"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称" prop="nameZh">
        <el-input v-model="addDialogForm.nameZh" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="iconCls">
          <e-icon-picker v-model="addDialogForm.iconCls"/>
      </el-form-item>
      <el-form-item label="菜单路径" prop="path">
        <el-input v-model="addDialogForm.path" placeholder="请输入菜单路径"></el-input>
      </el-form-item>
      <el-form-item label="组件名" prop="component">
        <el-input v-model="addDialogForm.component" placeholder="请输入组件名"></el-input>
      </el-form-item>
      <el-form-item label="父节点id" prop="parentId">
        <el-input v-model="addDialogForm.parentId" placeholder="请输入父节点id"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addMenu">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import menudata from '@/assets/data/menudata'
export default {
  name: "MenusAddDialog",
  data() {
    return {
      addDialogVisible: false,
      addDialogForm: {
        name: "",
        nameZh: "",
        path:"",
        iconCls:"",
        component:"",
        parentId:""
      },
      rules: {
        name: [{ required: true, message: "请输入菜单代码", trigger: "blur" }],
        nameZh: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
        component: [{ required: true, message: "请输入组件名", trigger: "blur" }],
        parentId: [{ required: true, message: "请输入父节点id", trigger: "blur" }],
      }
    };
  },
  methods: {
    addMenu() {
      this.$refs.addDialogForm.validate(valid => {
        if (valid) {
          var url = "/index/admin/menu/add";
          var data = {
            path:this.addDialogForm.path,
            name: this.addDialogForm.name,
            nameZh: this.addDialogForm.nameZh,
            iconCls:this.addDialogForm.iconCls,
            component:this.addDialogForm.component,
            parentId:this.addDialogForm.parentId   
          };
        //   console.log(data)
          menudata.addMenu(data);
          // this.$http
          //   .post(url, data)
          //   .then(res => {
          //     if (res.data.code == 200) {
          //       this.$message.success("添加菜单成功");
          //       this.$emit("needfresh", true);
          //       this.addDialogVisible = false;
          //     } else {
          //       this.$message.error("添加菜单失败");
          //     }
          //   })
          //   .catch(err => {
          //     // console.log(err);
          //   });
        } else {
          this.$message.error("不可为空");
        }
      });
    },
    addDialogClosed() {
      this.$refs.addDialogForm.resetFields();
    },
    open() {
      this.addDialogVisible = true;
    }
  }
};
</script>
<style scoped>
</style>
