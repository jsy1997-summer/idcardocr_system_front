import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    msg:"nhao",
    age:19,
  },
  getters:{
    myage(state){
      return age+1;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // a:ModuleA
   
  }
})
export default store
// const ModuleA = {
//   state:{
//     son:"我就在这里呀"
//   }
// }
