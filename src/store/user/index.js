import { reqGetCode, reqGetUserInfo, reqLogout, reqRegister, reqUserLogin } from "@/api";

export default {
  namespaced: true,
  state: {
    code: '',
    token: '',
    userInfo: {}
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code
    },
    USERLOGIN(state, token) {
      state.token = token
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR(state) {
      state.token = ''
      state.userInfo = {}
    }

  },
  actions: {
    // 获取验证码
    async getCode(context, phone) {
      let result = await reqGetCode(phone)
      if (result.code == 200) {
        context.commit('GETCODE', result.data)
        console.log('验证码----', result.data);
        return 'ok'
      } else {
        return Promise.reject('失败')
      }
    },
    // 用户注册
    async userRegister(context, user) {
      let result = await reqRegister(user)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject('注册失败')
      }
    },
    // 用户登录
    async userLogin(context, user) {
      let result = await reqUserLogin(user)
      if (result.code == 200) {
        context.commit("USERLOGIN", result.data.token)
        localStorage.setItem('token', result.data.token)
        return 'ok'
      } else {
        return Promise.reject('失败')
      }
    },

    // 获取用户信息
    async getUserInfo(context) {
      let result = await reqGetUserInfo()
      if (result.code == 200) {
        context.commit('GETUSERINFO', result.data)
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 退出登录
    async UserLogout(context) {
      // 通知服务器清除服务器数据
      let result = await reqLogout()
      if (result.code == 200) {
        context.commit('CLEAR')
        localStorage.removeItem('token')
        return 'ok'
      } else {
        return Promise.reject('退出失败')
      }
    }
  },
  getters: {

  }
}