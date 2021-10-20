<template>
  <el-container>
    <el-header>
      <span>
        电商后台管理系统
      </span>
      <button>
        登出
      </button>
    </el-header>

    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width='' >
         <el-button @click="Switch" class="collapse" >|||</el-button>
        <el-col :span="12">
          <el-menu
          :unique-opened="true"
          class="el-menu-vertical-demo"
            router 
            :default-active="$router.path"
            :collapse="isCollapse"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#000e9c"
          >
            <el-submenu
              :index="item.path"
              v-for="item of Menus"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>


              <el-menu-item-group>
                <el-menu-item 
                :index="child.path" 
                v-for="child in item.children" 
                :key="child.path"
                >
                  <i class="el-icon-menu"></i>
                  {{child.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <!-- 内容区 -->


      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { left_menus } from "../assets/style/js/api";

export default {
  data() {
    return {
      isCollapse: false,
      list_aside: [
        {
          name: "用户管理",
          id: 1,
          icon: "el-icon-user-solid",
          items:['用户列表']
        },
        {
          name: "权限管理",
          id: 2,
          icon: "el-icon-user-solid",
          items:['角色列表','权限列表']
        },
        {
          name: "商品管理",
          id: 3,
          icon: "el-icon-user-solid",
          items:['商品列表','分类参数','商品分类']
        },
        {
          name: "订单管理",
          id: 4,
          icon: "el-icon-user-solid",
          items:['订单列表']
        },
        {
          name: "数据统计",
          id: 5,
          icon: "el-icon-user-solid",
          items:['数据报表']
        },
      ],
    };
  },
  async mounted() {
    const data = await left_menus()
    this.$store.commit('getMenu',data)
    console.log(data);
  },
  methods:{
    Switch(){
      this.isCollapse = !this.isCollapse
    }
  },
  computed:{
    Menus(){
      return this.$store.state.left_Menus
    }
  }
};
</script>

<style lang="scss" scoped>
// ::v-deep .el-submenu__title,.el-menu-item,.el-menu-item-group{
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-container {
  background-color: #333744;
  height: 100%;
}
.el-header {

  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  span {
    font-size: 20px;
  }
  button {
    width: 60px;
    height: 30px;
  }
}

.el-aside {
  background-color: #333744;
  color: #333;
  max-width:200px;
  .el-menu{
    border: none;
  }
  .collapse {
    width: 100%;
    text-align: center;
    height: 20px;
    background-color: #333744;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  .el-menu-item {
    text-align: center;
    min-width: 0px !important;
  }
  .el-col-12 {
    width: 100%;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
