<template>
  <div class="column is-full-mobile is-half-tablet 
             is-one-third-desktop is-one-quarter-widescreen">
   <div class="card">
     <header class="card-header">
       <p class="card-header-title">{{ asamblea.organization_name }}</p>
     </header>
     <div class="card-image" @click="open(asamblea.assembly_id)">
       
       <figure class="image">
         <img src="/img/icon.png">
       </figure>
       
     </div>
     <footer class="card-footer" style="max-width:200px">
       <a class="is-light card-footer-item">
         <span>{{ asamblea.assembly_label }}</span>         
       </a>
     </footer>
     <!-- modal -->
     <b-modal :active.sync="isModalActive">
      <div class="card">
        <div class="card-content">
          <h2 class="title">
            {{ asamblea.assembly_label }}
            <small>({{ asamblea.assembly_id }})</small>
          </h2>
          <p>{{asamblea.assembly_label}}</p>
        </div>
      </div>
      </b-modal>
   </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      isModalActive: false,
    };
  },  
  props: {    
    asamblea: {
      type: Object
    },    
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }    
  },
  methods: {
    open(loquesea){
      this.$router.push('/assembly/' + loquesea)
    }
  }
}
</script>

<style>
  .card-image,
  .modal-background {
    cursor: pointer !important;
  }
</style>