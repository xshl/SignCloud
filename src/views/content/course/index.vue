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
    <!-- <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible="true" :title="crud.status.title" width="500px"> -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="500px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="课程封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action="#"
            :before-upload="beforeUp"
            :on-success="handleSuccess"
            :on-change="handleChange"
          >
            <img
              v-if="imageUrl && crud.status.add > 0"
              :src="imageUrl"
              class="avatar"
            />
            <i
              v-else-if="crud.status.add > 0"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <img
              v-else-if="crud.status.edit > 0 && this.form.cover"
              :src="this.form.cover"
              class="avatar"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="form.grade" />
        </el-form-item>
        <el-form-item label="所属学期" prop="semester">
          <el-input v-model="form.semester" />
        </el-form-item>
        <el-form-item label="院系" prop="college">
          <el-input v-model="form.college" />
        </el-form-item>
        <el-form-item label="任课老师" prop="teacher">
          <el-input v-model="form.teacher" />
        </el-form-item>
        <el-form-item label="学习要求" prop="learnRequire">
          <el-input v-model="form.learnRequire" />
        </el-form-item>
        <el-form-item label="教学进度" prop="teachProgress">
          <el-input v-model="form.teachProgress" />
        </el-form-item>
        <el-form-item label="考试安排" prop="examArrange">
          <el-input v-model="form.examArrange" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button
          :loading="crud.status.cu === 2"
          type="primary"
          @click="submit"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <el-table
      ref="table"
      :max-height="windowHeight * 0.69"
      v-loading="crud.loading"
      :data="crud.data"
      @selection-change="crud.selectionChangeHandler"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="课程封面">
              <el-image :src="scope.row.cover" class="avatar" :preview-src-list="[scope.row.cover]"></el-image> 
            </el-form-item>
            <el-form-item label="课程名称">
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label="课程编号">
              <span>{{ scope.row.id }}</span>
            </el-form-item>
            <el-form-item label="年级">
              <span>{{ scope.row.grade }}</span>
            </el-form-item>
            <el-form-item label="所属学期">
              <span>{{ scope.row.semester }}</span>
            </el-form-item>
            <el-form-item label="院系">
              <span>{{ scope.row.college }}</span>
            </el-form-item>
            <el-form-item label="学习要求">
              <span>{{ scope.row.learnRequire }}</span>
            </el-form-item>
            <el-form-item label="教学进度">
              <span>{{ scope.row.teachProgress }}</span>
            </el-form-item>
            <el-form-item label="考试安排">
              <span>{{ scope.row.examArrange }}</span>
            </el-form-item>
            <el-form-item label="课程二维码">
            <el-image :src="scope.row.qrcode" class="avatar" :preview-src-list="[scope.row.qrcode]"></el-image>
          </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="25px" />
      <el-table-column prop="id" label="课程编号" align="center" />
      <el-table-column prop="name" label="课程名称" align="center" />
      <el-table-column prop="grade" label="年级" align="center" />
      <el-table-column prop="semester" label="所属学期" align="center" />
      <el-table-column prop="teacher" label="任课教师" align="center" />
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
import user from '@/utils/userStore'

let Base64 = require("js-base64").Base64;

const defaultForm = {
  id: 0,
  name: null,
  college: null,
  qrcode: null,
  cover: null,
  creationDate: null,
  creator: 0,
  examArrange: null,
  grade: null,
  learnRequire: null,
  major: null,
  modifier: 0,
  modifitionDate: null,
  school: null,
  semester: null,
  teachProgress: null,
  teacher: null,
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
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      imageUrl: "",
      queryTypeOptions: [
        { key: "name", display_name: "课程名称" },
        { key: "code", display_name: "英文标识" },
        { key: "description", display_name: "描述" },
      ],
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入英文标识", trigger: "blur" }],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
      formdata: new window.FormData(),
    };
  },
  methods: {
    beforeUp(file) {
      console.log('phone', user.getPhone())
      return false;
    },
    handleSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      this.crud.resetForm();
      this.crud.toQuery();
    },
    handleChange(file, fileList) {
      this.formdata.append("cover", file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log('image', this.imageUrl)
    },
    submit() {
      this.formdata.append("name", this.form.name);
      this.formdata.append("grade", this.form.grade);
      this.formdata.append("semester", this.form.semester);
      this.formdata.append("school", this.form.school);
      this.formdata.append("college", this.form.college);
      this.formdata.append("major", this.form.major);
      this.formdata.append("teacher", this.form.teacher);
      this.formdata.append("learnRequire", this.form.learnRequire);
      this.formdata.append("teachProgress", this.form.teachProgress);
      this.formdata.append("examArrange", this.form.examArrange);
      this.formdata.append("id", this.form.id);
      this.formdata.append("qrcode", this.form.qrcode);
      this.formdata.append("creationDate", this.form.creationDate);
      this.formdata.append("modifitionDate", this.form.modifitionDate);
      if (this.crud.status.add === CRUD.STATUS.PREPARED) {
        this.formdata.append("creator", user.getPhone());
        this.formdata.append("modifier", this.form.modifier);
        this.crud.doAdd(this.formdata)
      } else if (this.crud.status.edit === CRUD.STATUS.PREPARED) {
        console.log('编辑课程')
        this.formdata.append("creator", this.form.creator);
        this.formdata.append("modifier", user.getPhone());
        this.formdata.append("cover", this.form.cover)
        this.crud.doEdit(this.formdata)
      }
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
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.avatar {
  width: 40px;
  height: 40px;
  display: block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-checkbox, .el-checkbox__input {
  display: flex;
}
</style>