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
    lessons:[],
    employees:[],
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
    newLesson: {
      classNumber: '',
      lessonNumber: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: ''
    },
    newEmployee: {
      fullName: '',
      position: '',
      phoneNumber: ''
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
    SET_LESSONS(state, newLesson) {
      state.newLesson = newLesson
    },
    SET_EMPLOYEE(state, newEmployee) {
      state.newEmployee = newEmployee
    },
    delLessons(state) {
      state.lessons = [];
    }
    
  },
  actions: {
    bindStudents: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('students', db.collection('students'))
    }),
    bindPosts: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('posts', db.collection('posts'))
    }),
    bindLessons: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('lessons', db.collection('lessons'))
    }),
    bindEmployees: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('employees', db.collection('employees'))
    }),

    updateStudent: firestoreAction((context, { id, doc }) => {
      db.collection('students').doc(id).update(doc);
    }),
    updateEmployee: firestoreAction((context, { id, doc }) => {
      db.collection('employees').doc(id).update(doc);
    }),

    async addPost({ commit }, newpost) {
      try {
        await db.collection('posts').add(newpost)
        commit('SET_POST', [this.state.newpost, newpost])
      } catch (error) {
        console.error('Ошибка при добавлении ученика', error)
      }
    },
    async addLesson({ commit }, newLesson) {
      try {
        await db.collection('lessons').add(newLesson)
        commit('SET_LESSONS', [this.state.newLesson, newLesson])
      } catch (error) {
        console.error('Ошибка при добавлении ученика', error)
      }
    },
    async addEmployee({ commit }, newEmployee) {
      try {
        await db.collection('employees').add(newEmployee)
        commit('SET_EMPLOYEE', newEmployee)
      } catch (error) {
        console.error('Ошибка при добавлении сотрудника', error)
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

    async updateLesson({ commit }, lesson) {
      try {
        await db.collection('lessons').doc(lesson.id).update(lesson);
        commit('SET_LESSONS', lesson);
      } catch (error) {
        console.error('Ошибка при обновлении урока', error)
      }
    },


    delStudent: firestoreAction((context, payload) => {
      return db.collection('students').doc(payload).delete()
    }),
    delPost: firestoreAction((context, payload) => {
      return db.collection('posts').doc(payload).delete()
    }),
    async delLessons({ commit }) {
      try {
        const snapshot = await db.collection('lessons').get()
        const batch = db.batch()
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref)
        })
        await batch.commit()
        commit('SET_LESSONS', [])
        console.log('Все записи расписания удалены')
      } catch (error) {
        console.error('Ошибка при очистке расписания:', error)
      }
    },

    
    removeStudent({ commit }, id) {
      db.collection('students').doc(id).delete();
    },

    removeEmployee({ commit }, id) {
      db.collection('employees').doc(id).delete();
    },




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
store.dispatch('bindLessons')
store.dispatch('bindEmployees')