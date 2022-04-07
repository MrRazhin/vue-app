import Vue from 'vue'
import Vuex from 'vuex'
import VueNativeSock from 'vue-native-websocket'

Vue.use(Vuex);
Vue.use(VueNativeSock, 'wss://test.relabs.ru/event', {format: 'json'});

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
