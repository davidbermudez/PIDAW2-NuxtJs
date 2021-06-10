export const state = () => ({
  store_token: null,
  store_user_uid: null,
  store_user_name: null,
  store_user_email: null,
  store_current_assembly: null,
  store_current_presentation: null,
})

export const mutations = {
  store_saveUser(state, store_user_uid){
    state.store_user_uid = store_user_uid;
  },
  store_saveToken(state, store_token){
    state.store_token = store_token;
  },
  store_saveName(state, store_user_name){
    state.store_user_name = store_user_name;
  },
  store_saveEmail(state, store_user_email){
    state.store_user_email = store_user_email;
  },
  store_saveAssembly(state, store_current_assembly){
    state.store_current_assembly = store_current_assembly;
  },
  store_savePresentation(state, store_current_presentation){
    state.store_current_presentation = store_current_presentation;
  }
}