import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardatas: [],
    mmm:4
  },
  getters:{
    totalnum(state){
      let tt =0
      state.cardatas.forEach(e=>{
        tt+= e.num;
      })
      return tt
    }
  },
  mutations: {
    addToCar(state, params) {
   
      //这判断id 相同则叠加
      let fid = state.cardatas.findIndex(e => e.id == params.id);
      console.log(fid);
      
      if (fid == -1) {
        state.cardatas.push(params)
      } else {
        console.log(state.cardatas);
        state.cardatas[fid].num += params.num
      }

    },
    changeCar(state,params){
      state.cardatas = params;
    }
  },
  // 异步操作
  actions: {

  },
  // computed
  modules: {
  }
})
