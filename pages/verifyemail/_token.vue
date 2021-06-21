<template>
  <section class="section" v-if="response.error">
    {{ response.error }}
  </section>
</template>

<script>
export default {
  computed: {
    store_user_uid: function () {
      return this.$store.state.store_user_uid;
    },
    store_token: function () {
      return this.$store.state.store_token;
    },
    store_user_email: function () {
      return this.$store.state.store_user_email;
    },
    store_user_name: function () {
      return this.$store.state.store_user_name;
    },
    loaded() {
      return this.$store.state.localStorage.status && this.$store.state.sessionStorage.status
    }
  },
  asyncData ({ params, $axios, store }) {
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
        // save localStorage & Cookie
        store.commit('localStorage/localStorage_saveToken', res.data.token)
        store.commit('localStorage/localStorage_saveUser', res.data.uid)
        store.commit('sessionStorage/sessionStorage_saveToken', res.data.token)
        store.commit('sessionStorage/sessionStorage_saveUser', res.data.uid)                
      }
    })
  },
  mounted(){
    if(this.store_user_uid){
      this.$router.push('/newpass')
    }
  }
}
</script>
