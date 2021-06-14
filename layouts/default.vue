<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          @click="toIndex"          
        >Assembly-voting  <div class="separator"><b-icon icon="chart-box" size="is-medium"/></div>
        </a>
        <div class="navbar-burger" @click="isActive = !isActive">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu" :class="{ active: isActive }">
        <div class="navbar-end" v-if="!store_user_uid">
          <div class="navbar-item">
            <div class="buttons">
              <NuxtLink class="button" to="/register">
                <strong>Registro</strong>
              </NuxtLink>
              <a class="button is-light" @click="isLoginActive=true">
                Acceder
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-end" v-if="store_user_uid">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button" @click="logout">
                <strong>Cerrar Sesión</strong>
              </a>              
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-3 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <nuxt-link
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-9">
        <nuxt />
      </div>
    </section>

    <!-- Modal para el login -->
    <b-modal :active.sync="isLoginActive">
      <form action="" v-on:submit.prevent="login">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Identificación</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input
                type="email"
                v-model="loginEmail"
                placeholder="Tu email"
                required>
              </b-input>
            </b-field>
            <b-field label="Contraseña">
              <b-input
                type="password" 
                v-model="loginPassword"
                password-reveal
                placeholder="Tu contraseña"
                required>
              </b-input>
            </b-field>
        </section>
        <section class="modal-card-body">
          <a @click="register">
                <strong>Nunca he accedido/He olvidado mi contraseña</strong>
              </a>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">Acceder</button>
        </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoginActive: false,
      loginEmail: '',
      loginPassword: '',
      recoverEmail: '',
      isActive: false,
      newPass1: '',
      newPass2: '',      
      items: [
        {
          title: 'Tus votaciones',
          icon: 'home',
          to: { name: 'dashboard' }
        },
        {
          title: 'Perfil',
          icon: 'star',
          to: { name: 'profile' }
        }
      ]
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
    login() {            
      return this.$axios.post('login/', {
        'user_name': this.loginEmail,
        'user_password': this.loginPassword
      })
      .then((res) => {
        if (res.data.result=='10'){
          console.log(res.data.message)
          this.$store.commit('store_saveToken', res.data.token)
          this.$store.commit('store_saveUser', res.data.uid)
          this.getUser(res.data.token, res.data.uid)
          // restore input field
          this.loginEmail = ''
          this.loginPassword = ''
          // hide modal
          this.isLoginActive = false
          // save locaStorage & Cookie
          this.$store.commit('localStorage/localStorage_saveToken', res.data.token)
          this.$store.commit('localStorage/localStorage_saveUser', res.data.uid)
          this.$store.commit('sessionStorage/sessionStorage_saveToken', res.data.token)
          this.$store.commit('sessionStorage/sessionStorage_saveUser', res.data.uid)

          this.$router.app.refresh()
          this.$router.push('/dashboard')
        }
        if (res.data.result=='0'){
          const error = (res.data.error)          
          // restore input fields
          this.loginEmail = ''
          this.loginPassword = ''
          alert(error)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    logout() {
      this.$store.commit('store_saveToken', null)
      this.$store.commit('store_saveUser', null)
      this.$store.commit('store_saveName', null)
      this.$store.commit('store_saveEmail', null)
      this.$store.commit('store_saveAssembly', null)
      this.$store.commit('store_savePresentation', null)
      //locaStorage
      this.$store.commit('localStorage/localStorage_saveToken', null)
      this.$store.commit('localStorage/localStorage_saveUser', null)
      //Cookie
      this.$store.commit('sessionStorage/sessionStorage_saveToken', null)
      this.$store.commit('sessionStorage/sessionStorage_saveUser', null)
      this.$router.push('/')
    },
    register() {
      // hide modal
      this.isLoginActive = false
      this.$router.push('/register')
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
    toIndex(){
      this.$router.push('/')
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
  .active{
    display: block !important;
  }

  .separator {
    margin-left: 5px;
  }
</style>
