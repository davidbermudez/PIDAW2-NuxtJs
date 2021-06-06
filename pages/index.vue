<template>
  <section class="section">
    <!-- empieza la parte de la búsqueda -->
    <div v-if="user_uid">
    <div class="columns">
      <div class="column">
        <form action="" v-on:submit.prevent="search">
          <b-input
            type="text"
            id="searchInput"
            v-model="searchText"
            placeholder="Filtro por título"
            required>
          </b-input>
        </form>
      </div>
      <div class="column">
        <a class="button is-primary" @click="search">Buscar</a> &nbsp;
        <a class="button is-info" @click="clear">Limpiar</a>
      </div>
    </div>
    <br>
    <!-- fin de la búsqueda -->
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
              <h1 class="title">{{ item.text }}</h1>
            </div>                            
          </b-carousel-item>          
        </b-carousel>  
      </div>
    </div>
    
  </section>
</template>

<script>
import Org from '~/components/Org'

export default {
  components: {
    Org
  },
  data() {
    return {
      searchText: '',
      items: [
        { text: 'Slide 1', img:'/img/001.jpg', prop: '/img/001-copia.jpg'},
        { text: 'Slide 2', img:'/img/002.jpg', prop: '/img/002-copia.jpg'},
        { text: 'Slide 3', img:'/img/003.jpg', prop: '/img/003-copia.jpg'},
        { text: 'Slide 4', img:'/img/004.jpg', prop: '/img/004-copia.jpg', attribution: 'Imagen de <a href="https://pixabay.com/es/users/carmen_carbonell-3615516/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2816353">Carmen Carbonell</a> en <a href="https://pixabay.com/es/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2816353">Pixabay</a>' },
        { text: 'Slide 5', img:'/img/005.jpg', prop: '/img/005-copia.jpg', attribution: '<a href="https://www.freepik.com/photos/hand">Hand photo created by wavebreakmedia_micro - www.freepik.com</a>' }
      ]
    };
  },
  asyncData ({ $axios }) {
    return $axios.get('/organization/')
    .then((res) => {
      return {
        'orgs': res.data,
      }
    })
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
.title {
  color:azure;
  transform: translateY(-250px);
  text-shadow: black 0.1em 0.1em;
}
</style>