const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    email: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  }
}

const actions = {
  // set user info
  setUserInfo({ commit }, userInfo) {
    commit('SET_NAME', userInfo.nick_name)
    commit('SET_AVATAR', userInfo.avatar)
    commit('SET_EMAIL', userInfo.email)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

