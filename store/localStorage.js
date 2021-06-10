// store/localStorage.js
export const state = () => ({
  localStorage_token: null,
  localStorage_user_uid: null,  
})


export const mutations = {
  localStorage_saveUser(state, localStorage_user_uid){
    state.localStorage_user_uid = localStorage_user_uid;
  },
  localStorage_saveToken(state, localStorage_token){
    state.localStorage_token = localStorage_token;
  }
}