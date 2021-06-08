export const state = () => ({
  token: null,
  user_uid: null,
  user_name: null,
  user_email: null,
  current_assembly: null,
  current_presentation: null,
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
  },
  saveAssembly(state, current_assembly){
    state.current_assembly = current_assembly;
  },
  savePresentation(state, current_presentation){
    state.current_presentation = current_presentation;
  }
}