<template>
  <div class="">
    <!-- identifiqued -->
    <div v-if="user_uid">
      <section class="section">
        <h1 class="title">Bienvenido/a {{ user_name }}</h1>
        <h2 class="subtitle">
          Participa en las votaciones a las que has sido convocado/a
        </h2>
      </section>      
      <div class="columns is-multiline">
        <Org
          v-for="org in orgs"
          :key="org.id"
          :org="org"
          title="org.name"
          icon="home"
          :photo="'https://localhost:8000' + org.photo"
        >
          Open source on <a href="https://github.com/buefy/buefy">
            GitHub
          </a>
        </Org>
      </div>
    </div>
    <!-- not identifiqued -->
    <div class="columns" v-if="!user_uid">
      <div class="column">        
        <b-carousel :indicator-inside="false">
          <b-carousel-item v-for="(item, i) in items" :key="i">
            <div class="has-text-centered">
              <b-image class="image" :src="item.img" :alt="item.attribution"></b-image>
              <h1 class="title title-slide">{{ item.text }}</h1>
            </div>                            
          </b-carousel-item>          
        </b-carousel>  
      </div>
    </div>    
  </div>
</template>

<script>
import Org from '~/components/Org'

export default {
  components: {
    Org
  },
  data() {
    return {
      assembly: [],
      searchText: '',
      items: [
        { text: 'Rápido, fácil e intuitivo', img:'/img/001.jpg', prop: '/img/001-copia.jpg'},
        { text: 'Desde tu dispositivo móvil', img:'/img/002.jpg', prop: '/img/002-copia.jpg'},
        { text: 'Votos telemáticos y presenciales', img:'/img/003.jpg', prop: '/img/003-copia.jpg'},
        { text: 'Voto anónimo o personalizado', img:'/img/004.jpg', prop: '/img/004-copia.jpg', attribution: 'Imagen de <a href="https://pixabay.com/es/users/carmen_carbonell-3615516/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2816353">Carmen Carbonell</a> en <a href="https://pixabay.com/es/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2816353">Pixabay</a>' },
        { text: 'Elecciones, Asambleas y Juntas', img:'/img/005.jpg', prop: '/img/005-copia.jpg', attribution: '<a href="https://www.freepik.com/photos/hand">Hand photo created by wavebreakmedia_micro - www.freepik.com</a>' }
      ]
    };
  },
  beforeCreate() {
    if (this.$store.state.user_uid != null) {
      const peticion1 = this.$axios.post('/voter/', {
        'uid': this.$store.state.user_uid,
        'token': this.$store.state.token
      })
      .then((res) => {
        if(res.data.result=='10'){
          this.$store.commit('saveName', res.data.user_name)          
          this.$store.commit('saveEmail', res.data.user_email)
        }
        if(res.data.result=='0'){
          alert(error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      //
      const peticion2 = this.$axios.post('/assembly/', {
        'uid': this.$store.state.user_uid,
        'token': this.$store.state.token
      })
      .then((res) => {
        if(res.data.result=='10'){
          this.$store.commit('saveName', res.data.user_name)
          // user_name = res.data.user_name
          // user_email = res.data.user_email
          this.$store.commit('saveEmail', res.data.user_email)
        }
        if(res.data.result=='0'){
          alert(error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      //
      const peticion3 = this.$axios.get('/organization/')
      .then((res) => {
        return {
          'orgs': res.data,
        }
      })
    }
  },
  computed: {
    user_uid: function () {
      return this.$store.state.user_uid;
    },
    token: function () {
      return this.$store.state.token;
    },
    user_email: function () {
      return this.$store.state.user_email;
    },
    user_name: function () {
      return this.$store.state.user_name;
    }
  },
  methods: {
    search () {
      this.orgs = []
      this.$el.querySelector('#searchInput').blur()  // esconder teclado móvil
      return this.$axios.get('/organization/', {
        params: {
          'search': this.searchText,
          'ordering': '-favoritos'
        }
      })
      .then((res) => {
        this.orgs = res.data
      })
    },
    clear () {
      this.searchText = '';
      this.search()
    }
  }
}
</script>

<style>
.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}
.title-slide {
  color:azure;
  transform: translateY(-250px);
  text-shadow: black 0.1em 0.1em;
}
</style>