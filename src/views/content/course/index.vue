<template>
  <div class="app-container">
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <el-input
          v-model="query.keywords"
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
      :before-close="cancelCourse"
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
          <el-select v-model="form.grade" style="width: 100%" clearable>
            <el-option
              v-for="item in grade"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学期" prop="semester">
          <!-- <el-input v-model="form.semester" /> -->
          <el-cascader
            v-model="form.semester"
            :options="semester"
            :props="{ expandTrigger: 'hover' }"
            separator="-"
            clearable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="院系" prop="college">
          <el-input v-model="form.college" />
        </el-form-item>
        <el-form-item
          label="任课老师"
          prop="teacher"
          v-if="crud.status.edit > 0"
        >
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
        <el-button type="text" @click="cancelCourse">取消</el-button>
        <el-button
          :loading="crud.status.cu === 2"
          type="primary"
          @click="submit"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible="crud.addSuccess"
      :before-close="cancel"
      width="500px"
      class="addSuccess"
    >
      <div class="addSuccess">
        <img src="../../../assets/image/success1.png" width="20px" />
        <h3 style="margin-left: 10px">课程创建成功</h3>
      </div>
      <h3 style="color: #000">班课号:{{ courseNum }}</h3>
      <el-image
        style="width: 200px; height: 200px; margin-bottom: 15%"
        :src="courseQrcode"
        :preview-src-list="[courseQrcode]"
      ></el-image>
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
              <el-image
                :src="scope.row.cover"
                class="avatar"
                :preview-src-list="[scope.row.cover]"
              ></el-image>
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
            <el-form-item label="任课老师">
              <span>{{ scope.row.teacher }}</span>
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
              <el-image
                :src="scope.row.qrcode"
                class="avatar"
                :preview-src-list="[scope.row.qrcode]"
              ></el-image>
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
import user from "@/utils/userStore";
import data from "@/utils/data";

let Base64 = require("js-base64").Base64;

const defaultForm = {
  id: 0,
  name: null,
  college: null,
  qrcode: null,
  cover: null,
  creationDate: null,
  creator: 0,
  examArrange: "",
  grade: null,
  learnRequire: "",
  major: null,
  modifier: 0,
  modifitionDate: null,
  school: null,
  semester: null,
  teachProgress: "",
  teacher: user.getName(),
};

export default {
  name: "Dict",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
  },
  created() {
    this.crud.addSuccess = false;
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
        { key: "grade", display_name: "年级" },
        { key: "semester", display_name: "所属学期" },
        { key: "college", display_name: "院系" },
        { key: "teacher", display_name: "任课老师" },
        { key: "learnRequire", display_name: "学习要求" },
        { key: "teachProgress", display_name: "教学进度" },
        { key: "examArrange", display_name: "教学安排" },
      ],
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        grade: [{ required: true, message: "请输入年级", trigger: "blur" }],
        semester: [
          { required: true, message: "请输入所属学期", trigger: "blur" },
        ],
        college: [{ required: true, message: "请输入院系", trigger: "blur" }],
        teacher: [
          { required: true, message: "请输入任课老师", trigger: "blur" },
        ],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
      formdata: new window.FormData(),
      courseQrcode: "",
      courseNum: "",
      addSuccess: false,
      grade: data.grade,
      semester: data.semester,
    };
  },
  watch: {
    "crud.addSuccess"() {
      this.courseQrcode = this.crud.res.data;
    },
  },
  methods: {
    beforeUp(file) {
      console.log("phone", user.getPhone());
      return false;
    },
    handleSuccess(response, file, fileList) {
      console.log("上传成功");
      this.$refs.upload.clearFiles();
      this.crud.resetForm();
      this.crud.toQuery();
    },
    handleChange(file, fileList) {
      this.formdata.append("cover", file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("image", this.imageUrl);
      console.log("form", this.form);
    },
    submit() {
      if (this.form.learnRequire == "") {
        this.form.learnRequire = "暂无内容";
      }
      if (this.form.teacherProgress == "") {
        this.form.teacherProgress = "暂无内容";
      }
      if (this.form.examArrange == "") {
        this.form.examArrange = "暂无内容";
      }
      this.semesterToString();
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
      this.formdata.append("modifier", this.form.modifier);
      this.formdata.append("creator", this.form.creator);
      this.formdata.append("modifitionDate", this.form.modifitionDate);
      if (this.crud.status.add === CRUD.STATUS.PREPARED) {
        this.formdata.append("creator", user.getId());
        this.crud.doAdd(this.formdata);
      } else if (this.crud.status.edit === CRUD.STATUS.PREPARED) {
        console.log("编辑课程");
        this.formdata.append("modifier", user.getId());
        this.formdata.append("cover", this.form.cover);
        this.crud.doEdit(this.formdata);
      }
      this.imageUrl = "";
      this.$refs.upload.clearFiles();
    },
    cancel() {
      this.crud.addSuccess = false;
    },
    cancelCourse() {
      this.imageUrl = "";
      this.crud.cancelCU();
    },
    semesterToString() {
      this.form.semester = this.form.semester[0] + "-" + this.form.semester[1];
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
.el-checkbox,
.el-checkbox__input {
  display: flex;
}
.addSuccess {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0;
}
.addSuccess .el-dialog__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>