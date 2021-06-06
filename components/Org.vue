<template>
  <div class="column is-full-mobile is-half-tablet 
             is-one-third-desktop is-one-quarter-widescreen">
   <div class="card">
     <header class="card-header">
       <p class="card-header-title">{{ org.name }}</p>
     </header>
     <div class="card-image" @click="isModalActive=true">
       <figure class="image">
         <img :src="photo">
       </figure>
     </div>
     <footer class="card-footer">
       <a class="button is-light card-footer-item">
         <span>{{ org.description }}</span>
         <b-icon icon="star"></b-icon>
       </a>
     </footer>
     <!-- modal -->
     <b-modal :active.sync="isModalActive">
      <div class="card">
        <div class="card-content">
          <h2 class="title">
            {{ org.name }}
            <small>({{ org.id }})</small>
          </h2>
          <p>{{org.name}}</p>
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
    photo: {
      type: String,
      default: ''  
    },
    org: {
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
  }
}
</script>

<style>
  .card-image,
  .modal-background {
    cursor: pointer !important;
  }
</style>