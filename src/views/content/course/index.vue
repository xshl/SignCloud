<template>
  <div class="app-container">
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <el-input
          v-model="query.blurry"
          clearable
          size="samll"
          placeholder="模糊搜索"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        ></el-input>
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!-- 签到参数设置表单组件 -->
    <!-- <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible="true" :title="crud.status.title" width="500px"> -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="500px"
      v-if="activeName == 'first'"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="paramRules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="upload"
            :before-upload="beforeUp"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img v-else-if="this.form.cover" :src="this.form.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程编号" prop="id">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="form.grade" />
        </el-form-item>
        <el-form-item label="所属学期" prop="">
          <el-input v-model="form.semester" />
        </el-form-item>
        <el-form-item label="院系" prop="school">
          <el-input v-model="form.school" />
        </el-form-item>
        <el-form-item label="任课老师" prop="teacher">
          <el-input v-model="form.teacher" />
        </el-form-item>
        <el-form-item label="学习要求" prop="requirements">
          <el-input v-model="form.requirements" />
        </el-form-item>
        <el-form-item label="教学进度" prop="requirements">
          <el-input v-model="form.requirements" />
        </el-form-item>
        <el-form-item label="考试安排" prop="requirements">
          <el-input v-model="form.requirements" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button
          :loading="crud.status.cu === 2"
          type="primary"
          @click="crud.submitCU"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <!-- 参数列表 -->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%"
    >
      <el-table-column
        prop="value2"
        label="签到允许距离范围(m)"
        align="center"
      />
      <el-table-column prop="value1" label="每次签到经验值" align="center" />
      <el-table-column prop="value3" label="一节课时间" align="center" />
      <el-table-column prop="updateTime" label="更新时间" align="center" />
      <el-table-column prop="user.username" label="操作者" align="center" />
      <!-- <el-table-column prop="status" label="状态" align="center"/> -->
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <!-- <el-table-column v-if="checkPer(['admin','dict:edit','dict:del'])" label="操作" width="130px" align="center" fixed="right"> -->
        <template slot-scope="scope">
          <udOperation :data="scope.row" :permission="permission" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import curdCourse from "@/api/content/course";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";

let Base64 = require("js-base64").Base64

const defaultForm = {
  id: 0,
  name: "null",
  college: "null",
  qrcode: "null",
  cover: "null",
  creationDate: null,
  creator: 0,
  examArrange: "null",
  grade: "null",
  learnRequire: "null",
  major: "null",
  modifier: 0,
  modifitionDate: null,
  school: "null",
  semester: "null",
  teachProgress: "null",
  teacher: "null",
};

export default {
  name: "Dict",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
  },
  cruds() {
    return [
      CRUD({
        title: "课程",
        url: "/api/class/course/all",
        crudMethod: { ...curdCourse },
      }),
    ];
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    return {
      imageUrl: "",
      queryTypeOptions: [
        { key: "name", display_name: "中文标识" },
        { key: "code", display_name: "英文标识" },
        { key: "description", display_name: "描述" },
      ],
      rules: {
        name: [{ required: true, message: "请输入中文标识", trigger: "blur" }],
        code: [{ required: true, message: "请输入英文标识", trigger: "blur" }],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
      paramRules: {
        // name: [{ required: true, message: "请选择业务名称", trigger: "blur" }],
        value1: [
          {
            required: true,
            message: "请输入签到允许距离范围",
            trigger: "blur",
          },
        ],
        value2: [
          { required: true, message: "请选择每次签到经验值", trigger: "blur" },
        ],
        value3: [
          { required: true, message: "请输入一节课时间", trigger: "blur" },
        ],
      },
      gradeRules: {
        name: [{ required: true, message: "请输入等级名称", trigger: "blur" }],
        scope: [
          { required: true, message: "请选择出勤率范围", trigger: "blur" },
        ],
      },
      grade: [
        {
          name: "",
          scope: [0, 100],
        },
      ],
      activeName: "first",
    };
  },
  methods: {
    beforeUp(file) {
      console.log(file);
      var reader = new FileReader()
      reader.readAsDataURL(file)
      var that = this
      reader.onload = function (e) {
        that.imageUrl = e.target.result
        // that.form.cover = imgcode
        // console.log('form', that.form.cover)
      }
    },
    upload(file) {
      console.log("file", file);
      var that = this
      var reader = new FileReader()
      reader.readAsDataURL(file.file)
      reader.onload = function (e) {
        var imgcode = e.target.result
        that.form.cover = imgcode
        console.log('form', that.form.cover)
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
      // // this.form.cover = "1111";
      // var image = base64ImgtoFile(this.form.cover)
      // console.log('image', image)
      // console.log('base64', Base64.encode(file))
      // var base64img = Base64.encode(file.file)
      // this.form.cover = base64img
      // console.log('base64img', base64img)
      // console.log('img', Base64.decode(base64img))
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>