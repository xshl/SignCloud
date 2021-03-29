<template>
  <el-form
    size="small"
    :model="data"
    ref="menusForm"
    :rules="rules"
    label-position="right"
    label-width="150px"
    v-loading="loading"
    :disabled="!editable"
    class="scroll_form"
  >
    <el-form-item label="Id">
      <el-row>
        <el-col :span="15">
          <el-input readonly autocomplete="off" v-model="data.id"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="name" label="菜单代码">
      <el-row>
        <el-col :span="15">
          <el-input type="textarea" v-model="data.name"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="nameZh" label="菜单名称">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.nameZh" placeholder="请输入菜单名称"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="iconCls" label="菜单图标">
      <el-row>
      <el-col :span="15">
      <e-icon-picker v-model="data.iconCls" />
      </el-col>
      </el-row>
    </el-form-item>
    <el-form-item prop="path" label="菜单路径">
      <el-row>
        <el-col :span="15">
          <el-input type="textarea" v-model="data.path"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="component" label="组件名">
      <el-row>
        <el-col :span="15">
          <el-input type="textarea" v-model="data.component"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="parentId" label="父节点id">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.parentId"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import menudata from '@/assets/data/menudata'
export default {
  name: "MenusInfoForm",
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入菜单代码", trigger: "blur" }],
        nameZh: [
          { required: true, message: "请输入菜单名称", trigger: "blur" }
        ],
        path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
        component: [
          { required: true, message: "请输入组件名", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "请输入父节点id", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetFields() {
      this.$refs.menusForm.resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.menusForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    submit() {
      this.$refs.menusForm.validate(valid => {
        if (valid) {
          var url = "/index/admin/menu/edit";
          var edit_data = {
            id: this.data.id,
            path:this.data.path,
            name: this.data.name,
            nameZh: this.data.nameZh,
            iconCls:this.data.iconCls,
            component:this.data.component,
            parentId:this.data.parentId   
          };

          menudata.editMenu(edit_data);
          // console.log(edit_data);
          //   this.$http.put(url,edit_data).then(res => {
          //     if(res.data.code==200){
          //       this.$message.success("编辑菜单成功")
          //       this.$emit("success-edit",true)
          //     }else{
          //       this.$message.error("编辑菜单失败")
          //     }
          //   }).catch(err => {
          //     // console.log(err)
          // })
        } else {
          this.$message.error("请按要求填写信息");
        }
      });
    }
  }
};
</script>
<style scoped>
.el-input__inner {
  width: 50%; 
  text-align: left;
}
.scroll-form {
  overflow: scroll;
}
.scroll_y {
  overflow-y: scroll;
  overflow-x: auto;
  max-height: 150px;
  height:auto;
}
</style>
