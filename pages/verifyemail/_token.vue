<template>
  <section class="section">    
    {{ response.error }}    
  </section>
</template>

<script>
export default {
  asyncData ({ params, $axios, store, redirect }) {
    const token = params.token
    console.log(token)
    return $axios.post('/verifyemail/', {
      'token': token,
    })
    .then((res) => {
      if (res.data.result=='0'){
        return {
          'response': res.data,
        }
      }
      if (res.data.result=='10'){
        store.commit('store_saveToken', res.data.token)
        store.commit('store_saveUser', res.data.uid)
        // save locaStorage & Cookie
        store.commit('localStorage/localStorage_saveToken', res.data.token)
        store.commit('localStorage/localStorage_saveUser', res.data.uid)
        store.commit('sessionStorage/sessionStorage_saveToken', res.data.token)
        store.commit('sessionStorage/sessionStorage_saveUser', res.data.uid)
        redirect("/newpass")
      }
    })
  },
  computed: {
    store_user_uid: function () {
      return this.$store.state.store_user_uid;
    },
    store_token: function () {
      return this.$store.state.store_token;
    }
  }
}
</script>
