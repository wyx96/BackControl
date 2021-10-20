<template>
  <div class="win" v-loading="loading" element-loading-text="拼命加载中">
    <div class="login">
      <img src="../assets/imgs/logo.png" alt="" />
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="login_input"
        >
          <el-form-item prop="name">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="ruleForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="ruleForm.psd"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="login(ruleForm)">登录</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Login } from "../assets/style/js/api";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loading: false,
      ruleForm: {
        name: "admin",
        psd: "123456",
      },
      rules: {
        name: [
          { required: true, message: "请输入正确用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        passowrd: [
          { required: true, message: "请输入正确密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async login(login) {
      this.loading = !this.loading;
      let { data, meta } = await Login(login);
      console.log(data);
      console.log(meta);

      if (meta.status == 200) {
        this.loading = !this.loading;
        sessionStorage.setItem("token", data.token);
        this.$message.success({
          message: "登陆成功",
          duration: 3000,
          onClose: () => {
            this.$router.push({
              name: "Home",
            });
          },
        });
      } else {
         this.loading = !this.loading;
        this.$message.error({
          message: "用户名或密码错误",
          duration: 3000,
          onClose: () => {
           
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.win {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  overflow: hidden;
}
.login {
  width: 600px;
  height: 400px;
  margin: 150px auto;
  overflow: hidden;
  position: relative;
  img {
    width: 100px;
    z-index: 1;
    height: 100px;
    position: absolute;
    background-color: #eeeeee;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    border: 10px solid #fff;
    box-shadow: rgb(243, 243, 243) 0px 0px 10px;
  }
  .content {
    width: 100%;
    height: 300px;
    margin: 60px auto;
    background-color: #fff;
    overflow: hidden;
    .login_input {
      width: 90%;
      margin: 100px auto;
      .btn {
        text-align: right;
      }
    }
  }
}
</style>
