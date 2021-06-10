<template>
<div>
  <section class="hero is-warning is-small">
    <div class="hero-body">
      <p class="title">
        Registro
      </p>      
      <p>
        El administrador de una Asamblea es quien registra a los usuarios convocados para participar en ella
      </p>
      <p>
        Si crees que debes participar en una votación, o símplemente se te ha olvidado la contraseña de acceso, introduce tu correo electrónico aquí:
      </p>
    </div>
  </section>
  <section class="section">    
    <form action="" v-on:submit.prevent="recover">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Registro</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Email">
            <b-input
              type="email"
              v-model="recoverEmail"
              placeholder="Tu email"
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
  data () {
    return {      
      recoverEmail: '',      
    }
  },
  computed: {
    store_user_uid: function () {
      return this.$store.state.store_user_uid;
    },
    store_token: function () {
      return this.$store.state.store_token;
    }
  },
  methods: {
    recover() {
      return this.$axios.post('recover/', {
        'user_name': this.recoverEmail        
      })
      .then((res) => {
        if (res.data.result=='10'){
          console.log(res.data.message)          
          // restore input fields
          this.recoverEmail = ''
          alert(res.data.message)
          this.$router.push('/')
        }
        if (res.data.result=='0'){
          const error = (res.data.error)          
          // restore input fields
          this.recoverEmail = ''          
          alert(error)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  fetch ({ store, redirect }) {
    if (store.state.store_user_uid) {
      return redirect('/index')
    }
  }
}
</script>

<style>

</style>