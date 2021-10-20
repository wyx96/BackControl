import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path:'/login',
    name:'login',
    meta:{isA:false},
    component:Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect:'/welcome',
    meta:{isA:true},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children:[
      {
        path:'/welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '../components/welcome/index.vue')
      },
      {
        path:'/users',
        component: () => import(/* webpackChunkName: "userList" */ '../views/userList.vue')
      },
      {
        path:'/rights',
        component: () => import(/* webpackChunkName: "Rights" */ '../views/Rights.vue')
      },
      {
        path:'/roles',
        component: () => import(/* webpackChunkName: "Roles" */ '../views/Roles.vue')
      },
      {
        path:'/categories',
        component: () => import(/* webpackChunkName: "Categories" */ '../views/Categories.vue')
      }
      
    ],
  },
  {
    path: '/users',
    name: 'userList',
    meta:{isA:true},
    
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]





const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  
  if(to.meta.isA){
    if(sessionStorage.getItem('token')){
      next()
    }else{
      return
    }
  }else{
    next()
  }
  
})


export default router
