<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 添加角色 -->
      <el-row>
        <el-col> <el-button type="primary" @click="addroles">添加角色</el-button> </el-col>
      </el-row>
      <!-- 列表 -->
      <el-table :data="Roles" border stripe>
        <!-- 展开栏 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 一级 -->
            <el-row
              :class="['bottom', index == 0 ? 'top' : '', 'center']"
              v-for="(item1, index) of scope.row.children"
              :key="item1.id"
            >
              <el-col :span="5">
                <el-tag
                  type="primary"
                  @close="removeDuty(scope.row, item1.id)"
                  closable
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级 -->
              <el-col :span="19">
                <el-row
                  :class="[index2 == 0 ? '' : 'top', 'center']"
                  v-for="(item2, index2) of item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      @close="removeDuty(scope.row, item2.id)"
                      closable
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-row
                      :class="[index3 == 0 ? '' : 'top']"
                      v-for="(item3, index3) of item2.children"
                      :key="item3.id"
                    >
                      <el-col>
                        <el-tag
                          type="warning"
                          @close="removeDuty(scope.row, item3.id)"
                          closable
                          >{{ item3.authName }}</el-tag
                        >
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 列表区 -->
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >搜索</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRole(scope.row)"
              >删除</el-button
            >
            <el-button size="mini" type="warning" @click="showDuty(scope.row)" icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

<!-- 添加角色 -->
<el-dialog
  title="添加角色"
  :visible.sync="addDialogVisible"
  width="50%"
  >
  <el-form :model="addrole" :rules="rules" ref="addruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="addrole.roleName"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="addrole.roleDesc"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="AddSure">确 定</el-button>
  </span>
</el-dialog>

    <!-- 权限分配弹框 -->
    <el-dialog
  title="分配权限"
  :visible.sync="showDutydialogVisible"
  width="50%"
  @close='clearKey'
  >
  <el-tree 
  ref="treeDuty"
  :data="Tree_Duty" 
  :props="defaultProps"   
  show-checkbox
  node-key='id'
  default-expand-all
  :default-checked-keys='activekey'		
></el-tree>

  <span slot="footer" class="dialog-footer">
    <el-button @click="showDutydialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SureDuty">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { getRoles,addRoles,RemoveRoles, removeDuty,getRightT,registerDuty } from "../assets/style/js/api";

export default {
  data() {
    var RoleName = (rule,value,callback)=>{
        const regname = /^[a-zA-Z0-9_-]{4,16}$/;
        if(regname.test(value)){
          return callback()
        }else{
          return callback(new Error("请输入合法角色名称"));
        }
    };
    var RoleDesc = (rule,value,callback)=>{
        const regdesc = /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/;
        if(regdesc.test(value)){
          return callback()
        }else{
          return callback(new Error("请输入合法角色描述"));
        }
    };
    return {
      addDialogVisible : false,
        showDutydialogVisible:false,
        Tree_Duty:[],
        defaultProps:{
            label:'authName',
            children:'children'
        },
        activekey:[],
        chioceID:'',
        addrole:{
          roleName:'',
          roleDesc:''
        },
         rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { validator: RoleName, trigger: 'blur' }
          ],
          roleDesc: [
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { validator: RoleDesc, trigger: 'blur' }
          ],
         },
    };
  },
  created() {
    this.getroles();
  },
  methods: {

    addroles(){
        this.addDialogVisible = true;
    },
    async AddSure(){
          const {data, meta} = await addRoles(this.addrole);
          console.log(data,meta);
          if(meta.status == 201){
            this.$message.success(meta.msg);
            this.getroles()
          }else{
            this.$message.error(meta.msg);
          }
          this.addDialogVisible = false
    },
    async removeRole(role){
        const Result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err);
        if(Result !== 'confirm'){
          return this.$message.error('操作取消');
        }else{
          const {data,meta} = await RemoveRoles(role);
          if(meta.status==200){
            this.$message.success(meta.msg);
            this.getroles();
          }else{
            this.$message.error(meta.msg);
          }
        }
    },
    async getroles() {
      const { data, meta } = await getRoles();
      console.log(data, meta);
      if (meta.status == 200) {
        this.$store.commit("Getroles", data);
      } else {
        this.$message.error(meta.msg);
      }
    },
    async removeDuty(role, rightId) {
      console.log(roleId);
      const Reslut = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (Reslut !== "confirm") {
        this.$message.error("操作取消");
      } else {
        const { data, meta } = await removeDuty(role.id, rightId);
        if (meta.status == 200) {
          role = data;
          this.$message.success(meta.msg);
        } else {
          this.$message.error(meta.msg);
        }
      }
    },
    async showDuty(node){
        this.chioceID = node.id
        const {data,meta}  = await getRightT();
        console.log(data,meta);
        if(meta.status == 200){
            this.Tree_Duty = data;
            this.getkey(node,this.activekey)
            this.showDutydialogVisible = true;
        }
    },
    getkey(node,arr){
        if(!node.children){
            return arr.push(node.id)
        }else{
            node.children.forEach(element => {
                this.getkey(element,arr)
            });
        }
    },
    clearKey(){
        this.activekey = []
    },
    async SureDuty(){
        const arr = [...this.$refs.treeDuty.getCheckedKeys(),
                        ...this.$refs.treeDuty.getHalfCheckedKeys()];
        console.log(arr);
        let str = arr.join(',')
        const{data, meta} = await registerDuty(this.chioceID,str);
        console.log(data,meta);
        if(meta.status == 200){
            this.$message.success(meta.msg);
            this.getroles();
        }else{
            this.$message.error(meta.msg)
        }
        this.showDutydialogVisible = false
    }
  },
  computed: {
    Roles() {
      return this.$store.state.Roles;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}
.bottom {
  border-bottom: 1px solid #eee;
}
.top {
  border-top: 1px solid #eee;
}
.center {
  display: flex;
  align-items: center;
}
</style>
