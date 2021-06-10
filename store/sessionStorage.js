// store/localStorage.js
export const state = () => ({
  sessionStorage_token: null,
  sessionStorage_user_uid: null,
})


export const mutations = {
  sessionStorage_saveUser(state, sessionStorage_user_uid){
    state.sessionStorage_user_uid = sessionStorage_user_uid;
  },
  sessionStorage_saveToken(state, sessionStorage_token){
    state.sessionStorage_token = sessionStorage_token;
  }
}