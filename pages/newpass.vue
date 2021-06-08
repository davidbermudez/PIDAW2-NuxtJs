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
  date() {
    return {
      newPass1: '',
      newPass2: '',
    }
  },
  computed: {
    user_uid: function () {
      return this.$store.state.user_uid;
    },
    token: function () {
      return this.$store.state.token;
    }
  },
  methods: {
    newPass() {
      if (this.newPass1==this.newPass2) {
        return this.$axios.post('newpass/', {
          'new_pass': this.newPass1,          
          'uid': this.$store.state.user_uid,
          'token': this.$store.state.token
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
    }
  }  
}
</script>

<style>

</style>