import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '../db.js'
import firebase from 'firebase/compat/app'
import "firebase/compat/auth"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    students:[],
    user: null,
    newStudent:{
      fullName: '',
      classNumber: '',
      monday:null,
      tuesday:null,
      wednesday:null,
      thursday:null,
      friday:null,
    },
    newPost:{
      title: '',
      text: '',
      hashtags: '',
      date: ''
    },
    posts:[],
  },
  getters: {
  },
  mutations: {
    ...vuexfireMutations,
    SET_USER(state, user) {
      state.user = user
    },
    SET_STUDENT(state, newStudent) {
      state.newStudent = newStudent
    },
    SET_POST(state, newStudent) {
      state.newStudent = newStudent
    },
    
  },
  actions: {
    bindStudents: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('students', db.collection('students'))
    }),
    bindPosts: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('posts', db.collection('posts'))
    }),


    updateStudent: firestoreAction((context, { id, doc }) => {
      db.collection('students').doc(id).update(doc);
    }),

    async addPost({ commit }, newpost) {
      try {
        await db.collection('posts').add(newpost)
        commit('SET_POST', [this.state.newpost, newpost])
      } catch (error) {
        console.error('Ошибка при добавлении ученика', error)
      }
    },



    async addStudent({ commit }, newStudent) {
      try {
        await db.collection('students').add(newStudent)
        commit('SET_STUDENT', [this.state.newStudent, newStudent])
        
      } catch (error) {
        
        console.error('Ошибка при добавлении ученика', error)
      }
    },
    delStudent: firestoreAction((context, payload) => {
      return db.collection('students').doc(payload).delete()
    }),
    delPost: firestoreAction((context, payload) => {
      return db.collection('posts').doc(payload).delete()
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
    async registerUser({ commit }, { email, password }) {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        commit('SET_USER', user);
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
store.dispatch('bindStudents')
store.dispatch('bindPosts')