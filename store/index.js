export const state = () => ({
  isAuth: false,
  user: null
})

export const mutations = {
  // MUTATION UNTUK MENGUBAH STATE DI ATAS
  SET_IS_AUTH: (state, payload) => {
    state.isAuth = payload
  },

  SET_USER: (state, payload) => {
    state.user = payload
  }
}

export const actions = {

}
