import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '../db.js'
import firebase from 'firebase/compat/app'
import "firebase/compat/auth"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    testList:[],
    user: null,
  },
  getters: {
  },
  mutations: {
    ...vuexfireMutations,
    SET_USER(state, user) {
      state.user = user
    },
  },
  actions: {
    bindTest: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('testList', db.collection('test'))
    }),


    async login(context,{email, password}){
      // console.log(email)
      // console.log(password)
      const promise = await firebase.auth().signInWithEmailAndPassword(email, password);
      try{
          if (promise){
          store.commit('SET_USER', promise.user)
          } else{
          throw new Error('error')
          }
      }catch(error){
          // console.log(error)
      }
    },
    async registerUser({ commit }, { password }) {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(password, password);
        const user = userCredential.user;
        commit('setUser', user);
        // Добавьте дополнительную логику регистрации, если необходимо
      } catch (error) {
        console.error(error);
        // Обработайте ошибку регистрации
      }
    },
    async signout(){
      try {
          await firebase.auth().signOut();
          store.commit('SET_USER', null)
      } catch (error) {
          // console.error("Ошибка при выходе из системы:", error);
      }
    }
  },
  modules: {
  }
})
store.dispatch('bindTest')