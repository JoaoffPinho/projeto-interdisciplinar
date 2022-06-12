import Vue from 'vue'
import Vuex from 'vuex'


import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async login({ commit }, user) {
      try{
          const loggedUser = await AuthService.login(user);
          commit('loginSuccess', loggedUser);
      }
      catch(error)
      {
          commit('loginFailure');
          throw error;
      }
  }
  },
  getters: {
    getMessage: (state) => state.message,
    getLoggedIn: (state) => state.loggedIn,
    getLoggedUser: (state) => state.loggedUser,
  }
})
