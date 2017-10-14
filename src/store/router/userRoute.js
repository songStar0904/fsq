export const GET_USER_ROUTE = 'GET_USER_ROUTE'
export const SET_USER_ROUTE = 'SET_USER_ROUTE'

const state = {userRoute: ''}

const mutations = {
  [GET_USER_ROUTE] (state, val) {
    state.userRoute = val
  },
  [SET_USER_ROUTE] (state, val) {
    state.userRoute = val
  }
}

export default {
  state,
  mutations
}
