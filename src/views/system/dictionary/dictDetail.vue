<template>
  <div>
    <div v-if="query.dicTypeId === ''">
      <div class="my-code">点击字典查看详情</div>
    </div>
    <div v-else>
      <!--工具栏-->
      <div class="head-container">
        <div v-if="crud.props.searchToggle">
          <!-- 搜索 -->
          <el-input
            v-model="query.name"
            clearable
            size="small"
            placeholder="输入字典标签查询"
            style="width: 200px"
            class="filter-item"
            @keyup.enter.native="toQuery"
          />
          <rrOperation />
        </div>
      </div>
      <!--表单组件-->
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
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button
            :loading="crud.status.cu === 2"
            type="primary"
            @click="crud.submitCU"
            >确认</el-button
          >
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        highlight-current-row
        style="width: 100%"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column prop="name" label="字典标签" />
        <el-table-column prop="value" label="字典值" />
        <el-table-column prop="defaultValue" label="默认值">
          <template slot-scope="scope">
            <div class="defaultValue" >
              <i v-if="scope.row.defaultValue" class="el-icon-check"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"  sortable/>
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
    </div>
  </div>
</template>

<script>
import crudDictDetail from "@/api/system/dictDetail";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";

const defaultForm = {
  name: null,
  value: null,
  sort: 999,
  defaultValue: 0,
  status: 1,
  updateTime: null,
  id: null,
};

export default {
  components: { pagination, rrOperation, udOperation },
  cruds() {
    return [
      CRUD({
        title: "字典详情",
        url: "/api/dictionary-details",
        query: { dicTypeId: "" },
        crudMethod: { ...crudDictDetail },
        optShow: {
          add: true,
          edit: true,
          del: true,
          reset: false,
        },
        queryOnPresenterCreated: false,
      }),
    ];
  },
  mixins: [
    presenter(),
    header(),
    form(function () {
      return Object.assign(
        { dictionaryType: this.dictionaryType },
        defaultForm
      );
    }),
  ],
  data() {
    return {
      dictId: null,
      rules: {
        name: [{ required: true, message: "请输入字典标签", trigger: "blur" }],
        value: [{ required: true, message: "请输入字典值", trigger: "blur" }],
      },
      permission: {
        add: ["admin", "dict:add"],
        edit: ["admin", "dict:edit"],
        del: ["admin", "dict:del"],
      },
    };
  },
  methods: {
    dicDetailChange(data) {
      console.log('修改', '')
      crudDictDetail.edit(data).then((res) => {
        console.log('res', res)
        this.$notify({
          title: res.data,
          type: 'success'
        });
      })
    },
    dicDetailDefaultValueChange(data) {
      data.defaultValue = 1
      this.dicDetailChange(data)
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
.defaultValue {
  height: 23px;
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
