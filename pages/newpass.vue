<template>
<div>
  <section class="hero is-warning is-small">
    <div class="hero-body">
      <p class="title">
        Nueva Contraseña
      </p>      
      <p>
        Su email ha sido verificado
      </p>
      <p>
        Ahora debe introducir una nueva contraseña
      </p>
    </div>
  </section>
  <section class="section">    
    <form action="" v-on:submit.prevent="newPass">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          
        </header>
        <section class="modal-card-body">
          <b-field label="Contraseña">
              <b-input
                type="password" 
                v-model="newPass1"
                password-reveal
                placeholder="Tu contraseña"
                required>
              </b-input>
            </b-field>
            <b-field label="Repita Contraseña">
              <b-input
                type="password" 
                v-model="newPass2"
                password-reveal
                placeholder="Tu contraseña"
                required>
              </b-input>
            </b-field>          
      </section>        
      <footer class="modal-card-foot">
        <button class="button is-primary">Enviar</button>
      </footer>
      </div>
    </form>
  </section>
</div>
</template>

<script>
export default {
  data() {
    return {
      newPass1: '',
      newPass2: '',
    }
  },
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
  methods: {
    newPass() {
      if (this.newPass1==this.newPass2) {
        return this.$axios.post('newpass/', {
          'new_pass': this.newPass1,          
          'uid': this.$store.state.store_user_uid,
          'token': this.$store.state.store_token
        })
        .then((res) => {
          if (res.data.result=='10'){
            alert(res.data.message)
            this.$router.push('/')
          }
          if (res.data.result=='0'){
          }
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        alert("Las contraseñas no coinciden")
      }
    },
    getUser(token, uid){
      const peticion1 = this.$axios.post('/voter/', {
        'uid': uid,
        'token': token
      })
      .then((res) => {
        if(res.data.result=='10'){
          this.$store.commit('store_saveName', res.data.user_name)          
          this.$store.commit('store_saveEmail', res.data.user_email)
        }
        if(res.data.result=='0'){
          alert(res.data.error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  created() {    
    let activate = false
    if (!this.$store.state.store_user_uid) {      
      if(!this.$store.state.localStorage.localStorage_user_uid){        
        if(!this.$store.state.sessionStorage.sessionStorage_user_uid){          
        } else {
          this.$store.commit('store_saveToken', this.$store.state.sessionStorage.sessionStorage_token)
          this.$store.commit('store_saveUser', this.$store.state.sessionStorage.sessionStorage_user_uid)
          activate = true
        }
      } else {
        this.$store.commit('store_saveToken', this.$store.state.localStorage.localStorage_token)
        this.$store.commit('store_saveUser', this.$store.state.localStorage.localStorage_user_uid)
        activate = true
      }
      if (activate){
        this.getUser(this.$store.state.store_token, this.$store.state.store_user_uid)
      }
    } else {
      this.getUser(this.$store.state.store_token, this.$store.state.store_user_uid)
    }
  }
}
</script>

<style>

</style>
