<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 添加列表 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="ShowdialogVisible"
            >添加列表</el-button
          >
        </el-col>
      </el-row>
      <ZkTable-table
        :data="categoriesList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color:lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color:red;"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="do" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </ZkTable-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <el-dialog
        title="添加分类"
        :visible.sync="showdialogVisible"
        @close="closeaddform"
        width="50%"
      >
        <!-- 表单内容 -->
        <el-form
          :model="addCategories"
          :rules="addCategoriesrules"
          ref="addCategories"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="addCategories.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="分类层级">
            <el-cascader
              v-model="selectKeys"
              :options="parentList"
              :props="cascaderprops"
              @change="haschange"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="SureAdd">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getCategories,
  GetSecondCategories,
  addCategories,
} from "../assets/style/js/api";
export default {
  data() {
    return {
      queryinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      categoriesList: [],
      total: null,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "do",
        },
      ],
      showdialogVisible: false,
      addCategories: {
        cat_name: "",
        cat_level: 0,
        cat_pid: 0,
      },
      addCategoriesrules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      parentList: [],
      cascaderprops: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true,
      },
      selectKeys: [],
    };
  },
  created() {
    this.getcategories();
  },
  methods: {
    SureAdd() {
      this.$refs.addCategories.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          const { data, meta } = await addCategories(this.addCategories);
          console.log(data, meta);
          if (meta.status == 201) {
            this.$message.success(meta.msg);
          } else {
            this.$$message.error(meta.msg);
          }
        }
      });
    },
    closeaddform() {
      this.$refs.addCategories.restFields();
      this.selectKeys = [];
      this.addCategories.cat_level = 0;
      this.addCategories.cat_pid = 0;
    },
    haschange() {
      console.log(this.selectKeys);
      if (this.selectKeys.length > 0) {
        this.addCategories.cat_pid = this.selectKeys[
          this.selectKeys.length - 1
        ];
        this.addCategories.cat_level = this.selectKeys.length;
        return;
      } else {
        this.addCategories.cat_pid = 0;
        this.addCategories.cat_level = 0;
      }
    },
    async getsecondCatr() {
      const { data, meta } = await GetSecondCategories();
      if (meta.status == 200) {
        this.parentList = data;
        console.log(data);
      } else {
        this.$message.error(meta.msg);
      }
    },
    ShowdialogVisible() {
      this.getsecondCatr();
      this.showdialogVisible = true;
    },
    async getcategories() {
      const { data, meta } = await getCategories(this.queryinfo);
      console.log(data, meta);
      if (meta.status == 200) {
        this.$store.commit("getCategX", data);
        this.categoriesList = data.result;
        this.total = data.total;
      }
    },
    handleSizeChange(newpagesize) {
      console.log(newpagesize);
      this.queryinfo.pagesize = newpagesize;
      this.getcategories();
    },
    handleCurrentChange(newpagenum) {
      console.log(newpagenum);
      this.queryinfo.pagenum = newpagenum;
      this.getcategories();
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped></style>
