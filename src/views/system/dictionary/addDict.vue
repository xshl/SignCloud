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
        @sort-change="sortChange"
        highlight-current-row
        style="width: 100%"
        :key="mainTableKey"
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
        <!-- <el-table-column prop="sort" label="排序" sortable /> -->
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
            <el-button
              type="success"
              icon="el-icon-top"
              :disabled="getIndex(scope.row) == 0"
              size="mini"
              @click="toUp(scope.row)"
            />
            <el-button
              type="danger"
              icon="el-icon-bottom"
              :disabled="getIndex(scope.row) == detail.length - 1"
              size="mini"
              @click="toDown(scope.row)"
            />
            <!-- <el-button v-permission="permission.edit" :loading="crud.status.cu === 2" :disabled="disabledEdit" size="mini" type="primary" icon="el-icon-edit" @click="crud.toEdit(data)" /> -->
            <el-button
              :loading="crud.status.cu === 2"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="toEdit(scope.row)"
            />
            <!-- <el-popover v-model="pop" v-permission="permission.del" placement="top" width="180" trigger="manual" @show="onPopoverShow" @hide="onPopoverHide"> -->
            <el-popover
              :value="pop == scope.row.value"
              placement="top"
              width="180"
              trigger="manual"
              @show="onPopoverShow"
              @hide="onPopoverHide"
            >
              <p>{{ msg }}</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="doCancel(scope.row)"
                  >取消</el-button
                >
                <!-- <el-button :loading="crud.dataStatus[crud.getDataId(data)].delete === 2" type="primary" size="mini" @click="crud.doDelete(data)">确定</el-button> -->
                <el-button
                  type="primary"
                  size="mini"
                  @click="doDelete(scope.row)"
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="toDelete(scope.row)"
              />
            </el-popover>
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
  sort: 0,
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
  activated() {
    setTimeout(() => {
      var _this = this;
      curdDictDetail.get(this.dictType.id).then((res) => {
        console.log("detail", res.data.content);
        _this.detail = res.data.content;
        _this.defaultForm = _this.detail.length;
      });
    }, 100);
  },
  created() {
    setTimeout(() => {
      var _this = this;
      curdDictDetail.get(this.dictType.id).then((res) => {
        console.log("detail", res.data.content);
        _this.detail = res.data.content;
        _this.defaultForm = _this.detail.length;
      });
    }, 100);
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    var valueIsUnique = (rule, value, callback) => {
      if (value == "" || value == undefined || value == null) {
        callback();
      } else if (this.isUnique(value)) {
        callback(new Error("数值重复"));
      } else {
        callback();
      }
    };
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
        value: [
          { required: true, message: "请输入字典值", trigger: "blur" },
          { validator: valueIsUnique, trigger: "blur" },
        ],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
      detail: [],
      dictType: { id: null, name: null, code: null, status: 1 },
      Dictdetail: [],
      isadd: false,
      isedit: false,
      value1: 0,
      pop: -1,
      msg: "确定删除本条数据吗？",
      mainTableKey: 1,
    };
  },
  methods: {
    add() {
      this.isadd = false;
      console.log("this.isedit", this.isedit);
      if (this.isedit == true) {
        console.log("修改", "");
        console.log("tag", this.detail.length);
        for (var i = 0; i < this.detail.length; i++) {
          if (this.detail[i].value == this.form.value) {
            this.detail[i] = this.form;
          }
          this.detail[i].sort = i;
        }
        if (this.form.defaultValue == 1) {
          this.changeDefault(this.form);
        }
      } else {
        console.log("新增", "");
        var data = {
          name: this.form.name,
          defaultValue: this.form.defaultValue,
          id: this.form.id,
          sort: this.form.sort,
          status: this.form.status,
          value: this.form.value,
        };
        if (data.defaultValue == 1) {
          this.changeDefault(data);
        }
        this.detail.push(data);
      }
      this.isedit = false;
      this.form = {
        name: null,
        value: 0,
        sort: this.detail.length,
        defaultValue: 0,
        status: 1,
        updateTime: null,
        id: null,
      };
      this.form.value = this.valueMax() + 1;
    },
    goback() {
      console.log("返回", "");
      console.log("tag", this.crud.status.cu);
      this.$emit("cancel");
    },
    submit() {
      console.log("提交", "");
      for (var i = 0; i < this.detail.length; i++) {
        this.detail[i].sort = i;
      }
      var addform = {
        dictionaryDetails: this.detail,
        dictionaryType: this.dictType,
      };
      if (this.dictType.id) {
        curdDictAndDetail.edit(addform).then((res) => {
          console.log("res", res);
          this.goback();
          this.crud.notify("修改成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
        });
      } else {
        curdDictAndDetail.add(addform).then((res) => {
          console.log("res", res);
          this.goback();
          this.crud.notify("新增成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
        });
      }
    },
    cancel() {
      console.log("取消", "");
      this.isadd = false;
      this.isedit = false;
    },
    toadd() {
      this.isadd = true;
    },
    isUnique(value) {
      if (this.isedit == true) {
        return false;
      }
      const data = this.detail;
      for (let i = 0; i < data.length; i++) {
        if (data[i].value == value) {
          return true;
        }
      }
      return false;
    },
    changeDefault(data) {
      for (let i = 0; i < this.detail.length; i++) {
        if (this.isedit == true) {
          if (i != this.getIndex(data)) {
            this.detail[i].defaultValue = 0;
          }
        } else {
          this.detail[i].defaultValue = 0;
        }
      }
      this.mainTableKey = Math.random();
    },
    valueMax() {
      var max = 0;
      for (let i = 0; i < this.detail.length; i++) {
        if (max < this.detail[i].value) {
          max = this.detail[i].value;
        }
      }
      return parseInt(max);
    },
    sortChange(column, prop, order) {
      console.log(column.prop); //prop标签 => nickname
      console.log(column.order); //descending降序、ascending升序
    },
    //
    doCancel(value) {
      this.pop = -1;
    },
    toDelete(data) {
      this.pop = data.value;
    },
    doDelete(value) {
      for (let i = 0; i < this.detail.length; i++) {
        if (value.value == this.detail[i].value) {
          this.detail.splice(i, 1);
        }
      }
      this.pop = -1;
    },
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener("click", this.handleDocumentClick);
      }, 0);
    },
    onPopoverHide() {
      document.removeEventListener("click", this.handleDocumentClick);
    },
    handleDocumentClick(event) {
      this.pop = -1;
    },
    toEdit(data) {
      this.form = data;
      this.isadd = true;
      this.isedit = true;
    },
    toUp(data) {
      console.log("上移", "");
      console.log("data", data);
      var i = this.getIndex(data);
      console.log("i", i);
      var t = this.detail[i];
      this.detail[i] = this.detail[i - 1];
      this.detail[i - 1] = t;
      console.log("detail", this.detail);
      this.mainTableKey = Math.random();
    },
    toDown(data) {
      console.log("下移", "");
    },
    getIndex(data) {
      for (let i = 0; i < this.detail.length; i++) {
        if (data.value == this.detail[i].value) {
          return i;
        }
      }
      return -1;
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