export const state = () => ({
  token: null,
  user_uid: null,
  user_name: null,
  user_email: null,
})

export const mutations = {
  saveUser(state, user_uid){
    state.user_uid = user_uid;
  },
  saveToken(state, token){
    state.token = token;
  },
  saveName(state, user_name){
    state.user_name = user_name;
  },
  saveEmail(state, user_email){
    state.user_email = user_email;
  }
}