<template>
  <div>
    <el-page-header
      @back="goback"
      content="新增字典"
      style="border-bottom: 1px solid #eee; margin-bottom: 1%; height: 30px"
    >
    </el-page-header>
    <el-card>
      <el-form
        ref="dictType"
        :model="dictType"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <div style="display: flex; flex-direction: row">
          <el-form-item label="中文标识" prop="name">
            <el-input v-model="dictType.name" style="width: 370px" />
          </el-form-item>
          <el-form-item label="英文标识" prop="code" style="margin-left: 5%">
            <el-input v-model="dictType.code" style="width: 370px" />
          </el-form-item>
        </div>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="dictType.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 2%">
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 1%">
          数据项
        </div>
        <el-button
          class="filter-item"
          size="mini"
          style="float: right; padding: 4px 10px"
          type="primary"
          icon="el-icon-plus"
          @click="toadd()"
          >新增</el-button
        >
      </div>

      <el-dialog
        append-to-body
        :close-on-click-modal="false"
        :before-close="cancel"
        :visible="isadd"
        :title="crud.status.title"
        width="500px"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="detailrules"
          size="small"
          label-width="80px"
        >
          <el-form-item label="字典标签" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="字典值" prop="value">
            <el-input v-model="form.value" />
          </el-form-item>
          <el-form-item label="默认值" prop="default">
            <el-switch
              v-model="form.defaultValue"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item label="排序" prop="dictSort">
            <el-input-number
              v-model.number="form.sort"
              :min="0"
              :max="999"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="cancel">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="add"
            >确认</el-button
          >
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="detail"
        highlight-current-row
        style="width: 100%"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column prop="name" label="字典标签" />
        <el-table-column prop="value" label="字典值" />
        <el-table-column prop="defaultValue" label="默认值">
          <template slot-scope="scope">
            <div class="defaultValue">
              <i v-if="scope.row.defaultValue" class="el-icon-check"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" sortable />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="dicDetailChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="260px"
          align="center"
          fixed="right"
        >
          <!-- <el-table-column v-if="checkPer(['admin','dict:edit','dict:del'])" label="操作" width="130px" align="center" fixed="right"> -->
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
              :move="true"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </el-card>
    <footer class="footer">
      <div style="display: flex; justify-content: flex-end">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
        <el-button type="warning" size="mini">重置</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import crudDict from "@/api/system/dict";
import curdDictAndDetail from "@/api/system/dict-detail";
import curdDictDetail from "@/api/system/dictDetail";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";

const defaultForm = {
  name: null,
  value: 0,
  sort: 999,
  defaultValue: 0,
  status: 1,
  updateTime: null,
  id: null,
};

export default {
  name: "addDict",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
  },
  cruds() {
    return [
      CRUD({
        title: "字典明细",
        url: "/api/dictionaries/dictionary-types-details",
        crudMethod: { ...curdDictAndDetail },
      }),
    ];
  },
  created() {
    setTimeout(() => {
      console.log("t", this.dictType);
      var _this = this;
      curdDictDetail.get(this.dictType.id).then((res) => {
        _this.detail[0] = res.data.content;
      });
    }, 100);
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
      detailrules: {
        name: [{ required: true, message: "请输入字典标签", trigger: "blur" }],
        value: [{ required: true, message: "请输入字典值", trigger: "blur" },],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
      detail: [],
      dictType: { id: null, name: null, code: null },
      Dictdetail: [],
      isadd: false,
      value1: 0
    };
  },
  methods: {
    add() {
      console.log("新增", "");
      this.isadd = false;
      console.log("tag", this.form);
      console.log("detail", this.form);
      var de = this.form
      this.detail.push(de);
      this.form.value ++;
      this.form.name = ""
    },
    goback() {
      console.log("返回", "");
      console.log("tag", this.crud.status.cu);
      this.$emit("cancel");
    },
    submit() {
      console.log("提交", "");
      var addform = {
        dictionaryDetails: this.detail,
        dictionaryType: this.dictType,
      };
      // this.dictType.dictionaryDetails = this.detail;
      curdDictAndDetail.add(addform).then((res) => {
        console.log("res", res);
        this.goback()
        this.crud.refresh()
        this.crud.notify("新增成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
      });
    },
    cancel() {
      console.log("取消", "");
      this.isadd = false;
    },
    toadd() {
      this.isadd = true;
    },
  },
};
</script>

<style>
.footer {
  border-top: 1px solid #e7eaec;
  background: white;
  padding: 10px 6px 0 6px;
  height: 80px;
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 85%;
}
</style>