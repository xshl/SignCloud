<template>
  <div class="app-container">
    <div v-if="crud.status.cu > 0" class="adddetail">
      <addDict ref="addDict" @cancel="crud.cancelCU"></addDict>
    </div>
    <div>
      <!-- 字典列表 -->
      <el-row :gutter="10">
        <el-col
          :xs="24"
          :sm="24"
          :md="10"
          :lg="11"
          :xl="11"
          style="margin-bottom: 10px"
        >
          <el-card class="box-card">
            <!--工具栏-->
            <div class="head-container">
              <div v-if="crud.props.searchToggle">
                <!-- 搜索 -->
                <el-input
                  v-model="query.blurry"
                  clearable
                  size="small"
                  placeholder="输入中英文标识搜索"
                  style="width: 200px"
                  class="filter-item"
                  @keyup.enter.native="crud.toQuery"
                />
                <rrOperation />
              </div>
              <crudOperation :permission="permission" />
            </div>
            <!--表格渲染-->
            <el-table
              ref="table"
              v-loading="crud.loading"
              :data="crud.data"
              highlight-current-row
              style="width: 100%"
              @selection-change="crud.selectionChangeHandler"
              @current-change="handleCurrentChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column
                :show-overflow-tooltip="true"
                prop="name"
                label="中文标识"
              />
              <el-table-column
                :show-overflow-tooltip="true"
                prop="code"
                label="英文标识"
              />
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    @change="dicStatusChange(scope.row, scope.row.status)"
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
          </el-card>
        </el-col>
        <!-- 字典详情列表 -->
        <el-col :xs="24" :sm="24" :md="14" :lg="13" :xl="13">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>字典明细</span>
              <el-button
                v-if="
                  this.$refs.dictDetail && this.$refs.dictDetail.query.dicTypeId
                "
                class="filter-item"
                size="mini"
                style="float: right; padding: 4px 10px"
                type="primary"
                icon="el-icon-plus"
                @click="$refs.dictDetail && $refs.dictDetail.crud.toAdd()"
                >新增</el-button
              >
              <!-- <el-button
              v-if="checkPer(['admin','dict:add']) && this.$refs.dictDetail && this.$refs.dictDetail.query.dictName"
              class="filter-item"
              size="mini"
              style="float: right;padding: 4px 10px"
              type="primary"
              icon="el-icon-plus"
              @click="$refs.dictDetail && $refs.dictDetail.crud.toAdd()"
            >新增</el-button> -->
            </div>
            <dictDetail ref="dictDetail" :permission="permission" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dictDetail from "./dictDetail";
import crudDict from "@/api/system/dict";
import CRUD, { presenter, header, form } from "@/components/Crud/crud";
import crudOperation from "@/components/Crud/CRUD.operation";
import pagination from "@/components/Crud/Pagination";
import rrOperation from "@/components/Crud/RR.operation";
import udOperation from "@/components/Crud/UD.operation";
import addDict from "./addDict";

const defaultForm = {
  id: null,
  name: null,
  description: null,
  code: null,
  dictDetails: [],
};

export default {
  name: "Dict",
  components: {
    crudOperation,
    pagination,
    rrOperation,
    udOperation,
    dictDetail,
    addDict,
  },
  cruds() {
    return [
      CRUD({
        title: "字典",
        url: "/api/dictionaries/dictionary-types",
        crudMethod: { ...crudDict },
      }),
    ];
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
      detail: [],
      dictType: null,
    };
  },
  methods: {
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      if (this.$refs.dictDetail) {
        this.$refs.dictDetail.query.dictName = "";
      }
      return true;
    },
    // 选中字典后，设置字典详情数据
    handleCurrentChange(val) {
      if (val) {
        if (this.crud.status.cu > 0) {
          console.log('val', val)
            this.$refs.addDict.dictType = val
        }
        this.$refs.dictDetail.query.dicTypeId = val.id;
        this.$refs.dictDetail.dictionaryType = val;
        this.$refs.dictDetail.crud.toQuery();
      }
    },
    dicStatusChange(data, val) {
      console.log("tag", this.crud.status.cu);
      crudDict.edit(data).then((res) => {
        this.$notify({
          title: res.message,
          type: "success",
        });
      });
    },
  },
};
</script>

<style scoped>
.add {
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: auto;
  color: #aaa;
}
.detail {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.adddetail {
  position: fixed;
  z-index: 99;
  background: white;
  width: 86%;
}
</style>
