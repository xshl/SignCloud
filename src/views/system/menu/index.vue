<template>
  <div class="content-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入搜索内容" v-model="keywords" clearable @clear="GetMenusAll">
            <el-button slot="append" icon="el-icon-search" @click="SearchMenus(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addMenus">新增菜单</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="DeletechosenMenus">批量删除</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="success" icon="el-icon-refresh" @click="GetMenusAll"></el-button>
        </el-col>
      </el-row>
      <div class="menus-table">
        <menus-manage-table
          @DeleteChosenMenus="GetSelections"
          @menusInfo-Edit="editOpen"
          ref="menusmanageTable"
        ></menus-manage-table>
      </div>
      <menus-info-edit-drawer @needfresh="Fresh" ref="menusinfoEditDrawer"></menus-info-edit-drawer>
    </el-card>
    <menus-add-dialog ref="menusaddDialog" @needfresh="Fresh"></menus-add-dialog>
  </div>
</template>

<script>
import MenusManageTable from "./MenusManageTable";
import MenusAddDialog from "./MenusAddDialog";
import MenusInfoEditDrawer from './MenusInfoEditDrawer'

export default {
  components: { MenusManageTable, MenusAddDialog,MenusInfoEditDrawer },
  data() {
    return {
      keywords: "",
      selections: []
    };
  },
  methods: {
    addMenus() {
      this.$refs.menusaddDialog.open();
    },
    editOpen(row) {
      this.$refs.menusinfoEditDrawer.open(row);
    },
    GetMenusAll() {
      this.$refs.menusmanageTable.load();
    },
    SearchMenus(keywords) {
      var url = "/index/admin/menu/search";
      if (keywords == "") {
        this.GetMenusAll();
      } else {
        this.$http
          .get(url, {
            params: { keywords }
          })
          .then(res => {
            if (res.data.code == 200) {
              // console.log("keyword")
              // console.log(res.data)
              if (res.data.data == undefined || res.data.data.length <= 0) {
                return this.$message.error("该菜单不存在");
              } else {
                this.$message.success("模糊查找成功");
                this.$refs.menusmanageTable.load(res.data.data);
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            // console.log(err);
          });
      }
    },
    GetSelections(val) {
      this.selections = val;
      // console.log(this.selections)
    },
    DeletechosenMenus(val) {
      this.$confirm("是否确认删除选中的菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id_nums = [];
          var url = "/index/admin/menu/delete";
          for (var i = 0; i < this.selections.length; i++) {
            id_nums.push(this.selections[i].id);
          }
          var data = {
            menuIds: id_nums
          };
          this.$http
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功删除选中的菜单");
                this.GetMenusAll();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    Fresh() {
      this.$refs.menusmanageTable.load();
    }
  }
};
</script>

<style>
</style>