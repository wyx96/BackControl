<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            @clear="getuserinfo()"
            clearable
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              @click="search"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="DialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="data.users" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改用户信息 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="EditUser(scope.row.id)"
            ></el-button>
            <!-- 删除用户信息 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
            <!-- 设置用户角色 -->
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="setUser(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="getSizechange"
        @current-change="getPagechange"
        :current-page="data.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="DialogVisible"
      width="50%"
      @close="clear"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="addUser"
        :rules="addrules"
        ref="addruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="EditDialogVisible"
      width="50%"
      @close="clear"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="editUser"
        :rules="addrules"
        ref="EditruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUser.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditSure"
          >确 定</el-button
        >
      </span>
    </el-dialog>
<!-- 用户角色分配框 -->
    <el-dialog
  title="分配角色"
  :visible.sync="setdialogVisible"
  width="50%"
  >
  <div>
    <p>当前的用户：{{this.user.username}}</p>
    <p>当前的角色：{{this.user.role_name}}</p>
    <p>分配新角色：
      <el-select v-model="rid" placeholder="请选择">
    <el-option
      v-for="item in rolesList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  </p>
    
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SetSure()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { Switch, user,setRoles, addUser,getRoles , getUser,editUser , delUser } from "../assets/style/js/api";
export default {
  data() {
    var checkEmail = (ruel, value, callback) => {
      const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        return callback(new Error("请输入合法邮箱"));
      }
    };
    var checkMobile = (ruel, value, callback) => {
      const regMbolie = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (regMbolie.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法手机号"));
      }
    };
    return {
      data:'',
      queryInfo: {
        query: "",
        pagesize: 2,
        pagenum: 1,
      },
      DialogVisible: false,
      EditDialogVisible: false,
      setdialogVisible: false,
      addUser: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      editUser: {
      },
      addrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max:10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      user:{},
      rolesList:{},
      rid:''
    };
  },
  created() {
    this.getuserinfo();
  },
  methods: {
   async SetSure(){
        const {data,meta} = await  setRoles(this.user.id,this.rid);
        console.log(data,meta);
        if(meta.status == 200){
          
          this.$message.success(meta.msg);
          this.setdialogVisible = false;
          this.rid='';
          this.user={};
          this.getuserinfo();

        }
    },
    async setUser(user){
      this.user = user;
      console.log(user);
      const {data,meta} = await getRoles()
      if(meta.status == 200){
        this.rolesList = data;

      }
      this.setdialogVisible = true
    },
    async del(id){
      const msg =  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        console.log(msg);
        if(msg != 'confirm'){
          return this.$message.info('操作已取消')
        }else{
          const {meta} = await delUser(id);
          if(meta.status == 200){
            this.$message.success(meta.msg)
            this.getuserinfo()
          }else{
            this.$message.error(meta.msg)
          }
        }
        
        ;
    },
    async EditUser(v){
      const {data,meta} = await getUser(v)
      console.log(data,meta);
      this.editUser = data
      this.EditDialogVisible = true;
      console.log(v);
    },
    clear() {
      this.$refs.addruleForm.resetFields();
    },
    EditSure(){
      this.$refs.EditruleForm.validate(async (valid) => {
        if (!valid) return;
        const { data, meta } = await editUser(this.editUser);
        console.log(data, meta);
        if (meta.status == 200) {
          this.$message.success(meta.msg);
          this.getuserinfo();
        } else {
          this.$message.error(meta.msg);
        }
        this.EditDialogVisible = false
      });
    },
    adduser() {
      this.$refs.addruleForm.validate(async (valid) => {
        if (!valid) return;
        const { data, meta } = await addUser(this.addUser);
        console.log(data, meta);
        if (meta.status == 201) {
          this.$message.success(meta.msg);
          this.getuserinfo();
        } else {
          this.$message.error(meta.msg);
        }
        this.DialogVisible = false;
      });
    },
    async getuserinfo() {
      const { data, meta } = await user(this.queryInfo);
      console.log(data, meta);
      if (meta.status == 200) {
        this.data = data;
      }
    },
    search() {
      this.getuserinfo();
    },
    async changeSwitch(v) {
      console.log(v);
      console.log(v.id);
      const { data, meta } = await Switch(v.id, v.mg_state);
      console.log(data, meta);
      if (meta.status == 200) {
        this.$message.success(meta.msg);
      } else {
        this.$message.error(meta.msg);
      }
    },
    getSizechange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getuserinfo();
    },
    getPagechange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getuserinfo();
    },
  },
};
</script>

<style lang="scss" scoped>

.main {
  .search {
    display: flex;
  }
}
</style>
