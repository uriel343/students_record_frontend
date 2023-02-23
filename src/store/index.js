import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpStudents = [
  {
    id: 100,
    name: "Uriel",
    birthdate: "2002-05-04",
    father_name: "Hugo",
    mother_name: "Esmeralda",
    course_grade: "1",
    section: "A",
    carnet: "2018053",
    date_admission: "2009-01-01"
  },
  {
    id: 101,
    name: "Uriel",
    birthdate: "2002-05-04",
    father_name: "Hugo",
    mother_name: "Esmeralda",
    course_grade: "1",
    section: "A",
    carnet: "2018053",
    date_admission: "2009-01-01"
  },
  {
    id: 102,
    name: "Uriel",
    birthdate: "2002-05-04",
    father_name: "Hugo",
    mother_name: "Esmeralda",
    course_grade: "1",
    section: "A",
    carnet: "2018053",
    date_admission: "2009-01-01"
  },
  {
    id: 103,
    name: "Uriel",
    birthdate: "2002-05-04",
    father_name: "Hugo",
    mother_name: "Esmeralda",
    course_grade: "1",
    section: "A",
    carnet: "2018053",
    date_admission: "2009-01-01"
  }
]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    currentStudent: {
      loading: false,
      data: {

      }
    },
    students: [...tmpStudents]
  },
  getters: {},
  actions: {
    getStudent({commit}, id){
      commit("setCurrentStudentLoading", true)
      return axiosClient.get(`/students/${id}`).then((res) => {
        commit("setCurrentStudent", res.data)
        commit("setCurrentStudentLoading", false)
        return res
      })
      .catch((err)=>{
        commit("setCurrentStudentLoading", false)
        throw err
      })
    },

    saveStudent({commit}, student){
      let response 
      if(student.id){
        response = axiosClient
                    .put(`/students/${student.id}`, student)
                    .then((res)=> {
                      commit("updateStudent", res.data)
                      return res
                    })
      } else {
        response = axiosClient.post('/students', student).then((res)=> {
          commit('saveStudent', res.data)
          return res
        })
      }
      return response
    },

    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token)
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token)
          return data;
        })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response;
        })
    },
  },
  mutations: {
    setCurrentStudentLoading: (state, loading) => {
      state.currentStudent.loading = loading
    },

    setCurrentStudent: (state, student) => {
      state.currentStudent.data = student.data
    },

    saveStudent: (state, student) => {
      state.students = [...state.students, student.data]
    },
    
    updateStudent: (state, student) => {
      state.students = state.students.map((s)=> {
        if(s.id == student.id){
          return student
        }
        return s
      })
    },

    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },

    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem('TOKEN', token);
    },
  },
  modules: {},
});

export default store;
