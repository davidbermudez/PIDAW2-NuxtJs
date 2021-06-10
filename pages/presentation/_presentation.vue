<template>
  <div class="">
    <section class="section">
      <h1 class="title"><b-icon icon="account" />{{ store_user_name }}</h1>      
    </section>
    <section class="section">
      <b-button type="is-success" @click="retour">Volver</b-button>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">
          {{ title }}
        </p>
        <p class="subtitle">
          {{ text }}
        </p>
      </div>
    </section>
    <div class="notification is-primary">
      <div class="buttons">
        <b-button v-for="item in buttons" 
          id="item.id"
          :key=item.id
          @click="vote(item.id)"
          type="is-primary"
          inverted outlined
        >
          {{ item.label }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id: '',
      text: '',
      title: '',
      buttons: []
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
    },
    store_current_assembly: function () {
      return this.$store.state.store_current_assembly
    },
    store_current_presentation: function () {
      return this.$store.state.store_current_presentation
    }
  },
  asyncData ({ params, store, $axios, redirect }) {
    if(!store.state.store_user_uid){
      return redirect('/')      
    }
    const id_ponencia = params.presentation
    return $axios.post('/options/', {
      'uid': store.state.store_user_uid,
      'token': store.state.store_token,
      'presentation': id_ponencia
    })
    .then((res) => {
      if(res.data.result=='10'){        
        return {
          'options': res.data.options,
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
    vote(option) {      
      let emitir_voto = this.$axios.post('/vote/', {
        'uid': this.$store.state.store_user_uid,
        'token': this.$store.state.store_token,
        'vote': option,
        'presentation': this.$route.params.presentation
      })
      .then((res) => {
        if(res.data.result=='10'){
          alert(res.data.message)
          this.retour()
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    retour() {
      this.$router.push('/assembly/' + this.$store.state.store_current_assembly[0]['id'])
    }
  },
  mounted() {
    this.store_current_presentation.forEach(element => {
      if (element.active==true){
        this.id = element.id
        this.text = element.text
        this.title = element.title
      }
    })
    this.options.forEach(element => {
      this.buttons.push({'id': element.id, 'label': element.label})
    })
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