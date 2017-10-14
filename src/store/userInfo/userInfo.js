import api from '@/api'
import { Message } from 'element-ui'
export const SET_ISLOGIN = 'SET_ISLOGIN'
export const SET_USER = 'SET_USER'
export const GET_USER = 'GET_USER'
export const IS_LOGIN = 'IS_LOGIN'
export const SET_COLLECT = 'SET_COLLECT'
export const GET_COLLECT = 'GET_COLLECT'

const state = {userInfo: [], islogin: 0, collect: []}

const actions = {
  [IS_LOGIN] ({ commit }) {
    return new Promise((resolve, reject) => {
      // console.log(api, state)
      api.apiObj.user.islogin(state.userInfo)
          .then((res) => {
            commit('SET_ISLOGIN', res.status)
            if (res.status) {
              commit('SET_USER', res.data)
              Message.success(res.msg)
              resolve(1)
            } else {
              Message.error(res.msg)
              resolve(0)
            }
          })
    })
  },
  [GET_USER] ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      api.apiObj.user.get({
        username: state.userInfo.username
      }).then((res) => {
        if (res.status) {
          commit('SET_USER', res.data)
          dispatch('GET_COLLECT')
          resolve(res.data)
        } else {
          Message.error(res.msg)
        }
      })
    })
  },
  [GET_COLLECT] ({commit}) {
    return new Promise((resolve, reject) => {
      api.apiObj.collect.get({
      }).then((res) => {
        if (res.status) {
          commit('SET_COLLECT', res.data)
        } else {
          Message.error(res.msg)
        }
      })
    })
  }
}
const getters = {
}
const mutations = {
  [SET_USER] (state, data) {
    state.userInfo = data
  },
  [SET_ISLOGIN] (state, status) {
    state.islogin = status
  },
  [SET_COLLECT] (state, data) {
    state.collect = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
