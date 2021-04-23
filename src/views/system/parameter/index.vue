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
        label-width="156px"
      >
        <!-- <el-form-item label="业务名称" prop="name">
          <el-select v-model="form.name" placeholder="请选择">
            <el-option label="手势签到" value="1"></el-option>
            <el-option label="一键签到" value="2"></el-option>
            <el-option label="限时签到" value="3"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="签到允许距离范围(m)" prop="value1">
          <el-input v-model="form.value2" />
        </el-form-item>
        <el-form-item label="每次签到经验值" prop="value2">
          <el-input v-model="form.value1" />
        </el-form-item>
        <el-form-item label="一节课时间(min)" prop="value3">
          <el-input v-model="form.value3" />
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
    <!-- 出勤等级设置表单组件 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible="crud.status.cu > 0"
      :title="crud.status.title"
      width="500px"
      v-if="activeName == 'second'"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="gradeRules"
        size="small"
        label-width="156px"
      >
        <el-form-item label="等级名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="出勤率范围(%）" prop="scope">
          <el-slider v-model="form.scope" range></el-slider>
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
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane name="first" label="签到参数设置">
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
          <el-table-column
            prop="value1"
            label="每次签到经验值"
            align="center"
          />
          <el-table-column prop="value3" label="一节课时间" align="center" />
          <el-table-column prop="updateTime" label="更新时间" align="center" />
          <!-- <el-table-column prop="user.username" label="操作者" align="center" /> -->
          <!-- <el-table-column prop="status" label="状态" align="center"/> -->
          <el-table-column
            label="操作"
            width="130px"
            align="center"
            fixed="right"
          >
            <!-- <el-table-column v-if="checkPer(['admin','dict:edit','dict:del'])" label="操作" width="130px" align="center" fixed="right"> -->
            <template slot-scope="scope">
              <udOperation :data="scope.row" :permission="permission" />
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination />
      </el-tab-pane>
      <el-tab-pane name="second" label="出勤等级设置">
        <el-table
          ref="table"
          v-loading="crud.loading"
          :data="crud.data"
          style="width: 100%"
        >
          <el-table-column prop="name" label="字典标签" />
          <el-table-column prop="value" label="字典值" />
          <el-table-column prop="defaultValue" label="默认值" />
          <el-table-column prop="sort" label="排序" />
          <el-table-column prop="status" label="状态" />
          <el-table-column
            label="操作"
            width="130px"
            align="center"
            fixed="right"
          >
            <!-- <el-table-column v-if="checkPer(['admin','dict:edit','dict:del'])" label="操作" width="130px" align="center" fixed="right"> -->
            <template slot-scope="scope">
              <udOperation :data="scope.row" :permission="permission" />
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import crudParams from "@/api/system/param";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";

const defaultForm = {
  id: null,
  name: null,
  description: null,
  code: null,
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
    if (this.activeName == "first") {
      return [
        CRUD({
          title: "签到参数",
          url: "/api/params",
          crudMethod: { ...crudParams },
        }),
      ];
    } else {
      return [
        CRUD({
          title: "签到参数",
          url: "/api/params",
          crudMethod: { ...crudParams },
        }),
      ];
    }
  },
  computed: {
    ...mapGetters(["phone"]),
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    return {
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
  methods: {},
};
</script>

<style>
</style>