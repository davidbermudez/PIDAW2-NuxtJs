<template>
  <div class="">
    <section class="section">
      <h1 class="title">{{ store_user_name }}</h1>
    </section>
    <section class="section">
      <b-button type="is-success" @click="refresh">Refresh</b-button>
    </section>
    <div class="columns is-multiline">        
      <template>
        <section class="section">
          <h2 class="title">{{ store_current_assembly[0]['label'] }}:</h2>
          <template>
            <b-table
              :data="ponencias"
              :columns="columns"
              :row-class="(row, index) => row.active === true && 'is-info'"              
              :@click="(row, index) => row.active === true && 'votar()'"
            >
            </b-table>
          </template>          
        </section>
      </template>            
    </div>
    <section class="section">
      <b-button v-if="activaBoton" type="is-primary" @click="votar()">Votar</b-button>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activaBoton: false,      
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
    const id_asamblea = params.assembly
    return $axios.post('/presentations/', {
      'uid': store.state.store_user_uid,
      'token': store.state.store_token,
      'assembly': id_asamblea
    })
    .then((res) => {
      if(res.data.result=='10'){        
        store.commit('store_savePresentation', res.data.ponencias)        
        store.commit('store_saveAssembly', res.data.assembly_data)
        return {
          'ponencias': res.data.ponencias,          
        }
      }
      if(res.data.result=='0'){
        alert(res.data.error)
        this.$router.push('/dashboard')
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
      this.store_current_presentation.forEach(element => {
        if (element.active==true){
          this.activaBoton = true;
        }
      })
    },
    votar() {
      if(this.activaBoton == true){
        this.store_current_presentation.forEach(element => {
          if (element.active==true){
            this.$router.push('/presentation/' + element.id)
          } 
        })
      }
    }
  },
  mounted() {
    this.activateButton()
  },
  fetch() {
    
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
  background: rgb(59, 177, 255);
  color: #333;
}

</style>