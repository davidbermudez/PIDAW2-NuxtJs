<template>
  <div class="">
    <section class="section">
      <h1 class="title">Bienvenido/a {{ user_name }}</h1>
      <h2 class="subtitle">
        Participa en las votaciones a las que has sido convocado/a
      </h2>
    </section>
    <button @click="refresh">Refresh</button>
    <div class="columns is-multiline">        
      <template>
        <section class="section">
          <h2 class="title">{{ votacion_name }}:</h2>
          <template>
            <b-table :data="ponencias" :columns="columns" :row-class="(row, index) => row.active === true && 'is-info'"></b-table>
          </template>          
        </section>
      </template>
      <b-button v-if="activaBoton" type="is-primary" @click="votar()">Votar</b-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activaBoton: false,
      votacion_name: '',
      id_asamblea: '',      
      columns: [        
        {
          field: 'title',
          label: 'Title',
        },
        {
          field: 'text',
          label: 'Text',
        },
        {
          field: 'active',
          label: 'Active',
          centered: true
        }        
    ]
    };
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
    },
    current_presentation: function () {
      return this.$store.state.current_presentation
    }
  },
  asyncData ({ params, store, $axios }) {
    const id_asamblea = params.assembly
    return $axios.post('/presentations/', {
      'uid': store.state.user_uid,
      'token': store.state.token,
      'assembly': id_asamblea
    })
    .then((res) => {
      if(res.data.result=='10'){        
        store.commit('savePresentation', res.data.ponencias)        
        return {
          'ponencias': res.data.ponencias,
          'votacion_name': res.data.assembly_name
        }
      }
      if(res.data.result=='0'){
        alert(error)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {    
    refresh() {
      this.$nuxt.refresh()
      this.activateButton()
    },
    activateButton() {
      this.activaBoton = false
      this.current_presentation.forEach(element => {
        if (element.active==true){
          this.activaBoton = true;
        }
      })
    },
    votar() {
      if(this.activaBoton == true){
        this.current_presentation.forEach(element => {
          if (element.active==true){
            this.$router.push('/presentation/' + element.id)
          } 
        })
      }
    }
  },
  mounted() {
    this.activateButton()
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

tr.is-info {
  background: #167df0;
  color: #fff;
}

</style>