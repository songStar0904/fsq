import api from '@/api'
import { Message } from 'element-ui'
export const SET_CART = 'SET_CART'
export const SET_PCART = 'SET_PCART'
export const SET_TCART = 'SET_TCART'
export const SET_GOODS = 'SET_GOODS'
export const GET_ONE_GOODS = 'GET_ONE_GOODS'
export const SET_TCART_GOODS = 'SET_TCART_GOODS'
export const SET_TCART_ADDRESS = 'SET_TCART_ADDRESS'
export const SET_TCART_REMARKS = 'SET_TCART_REMARKS'
export const GET_CART = 'GET_CART'
export const DEL_CART = 'DEL_CART'
export const DEL_TCART = 'DEL_TCART'
export const CHANGE_CART = 'CHANGE_CART'

const state = {
  cart: [],
  // 临时添加的
  pCart: [],
  tCart: {
    totalMoney: 0,
    goods: {},
    address: {},
    remarks: ''
  } // 订单
}

const actions = {
  [CHANGE_CART] ({ dispatch }) {
    return new Promise((resolve, reject) => {
      api.apiObj.cart.handle(state.pCart)
          .then((res) => {
            if (res.status) {
              Message.success(res.msg)
              resolve(1)
            } else {
              Message.error(res.msg)
            }
          })
    })
  },
  [GET_CART] ({ dispatch, commit }) {
    api.apiObj.cart.get()
        .then((res) => {
          let data = res.data
          commit('SET_CART', data)
          if (res.status) {
          } else {
            Message.error(res.msg)
          }
        })
  }
}
const getters = {
}
const mutations = {
  [SET_PCART] (state, data) {
    state.pCart = data
  },
  [SET_CART] (state, data) {
    state.cart = data
  },
  [SET_GOODS] (state, data) {
    state.cart.forEach((item, i) => {
      // debugger
      if (item.id === data.id) {
        state.cart[i].goods = data
        // debugger
        // 设置用户所购买的style以及sub
        data.style.forEach((sitem, index) => {
          console.log(sitem, state.cart[i].style.sid)
          if (sitem.sid === state.cart[i].style.sid) {
            state.cart[i].goods.style = data.style[index]
          }
        })
        data.sub.forEach((sitem, index) => {
          console.log(sitem, state.cart[i].sub.sid)
          if (sitem.sid === state.cart[i].sub.sid) {
            state.cart[i].goods.sub = data.sub[index]
          }
        })
      }
    })
  },
  [GET_ONE_GOODS] (state, data) {
    // debugger
    state.dispatch('GET_GOODS', data)
  },
  [SET_TCART_GOODS] (state, data) {
    state.tCart.totalMoney = data.totalMoney
    state.tCart.goods = data
  },
  [SET_TCART_ADDRESS] (state, data) {
    state.tCart.address = data
  },
  [SET_TCART_REMARKS] (state, data) {
    state.tCart.remarks = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
