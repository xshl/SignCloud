<template>
  <div class="conatiner">
    <div class="content">
      <div class="title">工程实践2班06组</div>
      <div class="member">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="title" label=" " align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="cno" label="学号" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: "组长",
          name: "许舒玲",
          cno: "200327097",
        },
        {
          title: "组员",
          name: "颜宇铖",
          cno: "200327101",
        },
        {
          title: "组员",
          name: "张  林",
          cno: "200327117",
        },
        {
          title: "组员",
          name: "陈志炜",
          cno: "200327134",
        },
      ],
    };
  },
};
</script>

<style>
.conatiner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.content {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  border: #409eff 1px solid;
  border-radius: 5px;
  background-color: #409eff;
}
.title {
  color: white;
  font-size: 16pt;
  padding: 3%;
}
.member {
  background-color: white;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  padding: 3% 15%;
}
</style>