export const state = () => ({
  user: {
    name: '',
    email: '',
    token: null,
    refresh_token: null
  }
})

export const mutations = {
  saveCredential(state, user) {
    state.user = user
  }
}

export const getters = {
  isLogin(state) {
    return state.user.token !== null
  }
}