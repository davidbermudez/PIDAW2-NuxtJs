<template>
  <div class="">    
    <div v-if="store_user_uid">
      <section class="section">
        <h1 class="title">Bienvenido/a {{ store_user_name }}</h1>
        <h2 class="subtitle">
          Participa en las votaciones a las que has sido convocado/a
        </h2>
      </section>      
      <div class="columns is-multiline">        
        <template>
          <section class="section">
            <h2 class="title">Votaciones:</h2>
            <div class="columns is-multiline" v-if="assembly">
              <Org
                v-for="asamblea in assembly"
                :key="asamblea.assembly_id"
                :asamblea="asamblea"
                title="asamblea.label"
                icon="home"
              />
            </div>
          </section>
        </template>
      </div>
    </div>    
  </div>
</template>

<script>
import Org from '~/components/Org'

export default {
  assembly: [],
  components: {
    Org
  },
  data() {
    return {      
      searchText: '',
      items: [
        { text: 'Rápido, fácil e intuitivo', img:'/img/001.jpg', prop: '/img/001-copia.jpg', color: 'primary' },
        { text: 'Desde tu dispositivo móvil', img:'/img/002.jpg', prop: '/img/002-copia.jpg', color: 'info'},
        { text: 'Votos telemáticos y presenciales', img:'/img/003.jpg', prop: '/img/003-copia.jpg', color: 'success'},
        { text: 'Voto anónimo o personalizado', img:'/img/004.jpg', prop: '/img/004-copia.jpg', attribution: 'Imagen de <a href="https://pixabay.com/es/users/carmen_carbonell-3615516/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2816353">Carmen Carbonell</a> en <a href="https://pixabay.com/es/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2816353">Pixabay</a>', color: 'warning'},
        { text: 'Elecciones, Asambleas y Juntas', img:'/img/005.jpg', prop: '/img/005-copia.jpg', attribution: '<a href="https://www.freepik.com/photos/hand">Hand photo created by wavebreakmedia_micro - www.freepik.com</a>', color: 'danger'}
      ]
    };
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
    }
  },
  asyncData ({ store, $axios }) {
    // cargamos las asambleas de este usuario
    if (store.state.store_user_uid != null) {     
      return $axios.post('/assembly/', {
        'uid': store.state.store_user_uid,
        'token': store.state.store_token
      })
      .then((res) => {
        if(res.data.result=='10'){
          console.log("asambleas: ", res.data.assembly)
          return {
            'assembly': res.data.assembly
          }
        }
        if(res.data.result=='0'){
          alert(error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  fetch ({ store, redirect }) {
    if (!store.state.store_user_uid) {
      return redirect('/')
    }
  },
  mounted() {
    // this.$nuxt.refresh()
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
  /* transform: translateY(-250px); */
  text-shadow: black 0.1em 0.1em;
  z-index: 90;
}
</style>