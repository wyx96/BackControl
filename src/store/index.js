import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    left_Menus:[],
    Right:[],
    Roles:[],
    Categories:[]
  },
  mutations: {
    getMenu(state,val){
       state.left_Menus = val
    },
    Getright(state,val){
      state.Right = val
    },
    Getroles(state,val){
      state.Roles = val
    },
    getCategX(state,val){
      state.Categories=val;
    }
  },
  actions: {
  },
  modules: {
  }
})
