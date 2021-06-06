export const state = () => ({
  token: null,
  user_uid: null
})

export const mutations = {
  saveUser(state, user_uid){
    state.user_uid = user_uid;
  },
  saveToken(state, token){
    state.token = token;
  }
}