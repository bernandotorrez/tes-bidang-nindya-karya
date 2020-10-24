export const state = () => ({
  isAuth: false // STATE SEBAGAI TANDAI SUDAH LOGIN JIKA BELUM
})

export const mutations = {
  // MUTATION UNTUK MENGUBAH STATE DI ATAS
  SET_IS_AUTH (state, payload) {
    state.isAuth = payload
  }
}
