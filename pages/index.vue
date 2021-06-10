<template>
  <div class="">
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-by">
              <img src="/img/001.jpg" alt="Placeholder image">
            </figure>
            <div class="has-text-centered mt-3 content">Rápido, fácil e intuitivo</div>
          </div>
        </div>        
      </div>
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-by">
              <img src="/img/002.jpg" alt="Placeholder image">
            </figure>
            <div class="has-text-centered mt-3 content">Desde tu dispositivo móvil</div>
          </div>
        </div>              
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-by">
              <img src="/img/003.jpg" alt="Placeholder image">
            </figure>
            <div class="has-text-centered mt-3 content">Votos telemáticos y presenciales</div>
          </div>
        </div>                      
      </div>    
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-by">
              <img src="/img/004.jpg" alt="Placeholder image">
            </figure>
            <div class="has-text-centered mt-3 content">Voto anónimo o personalizado</div>
          </div>
        </div>              
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-by">
              <img src="/img/005.jpg" alt="Placeholder image">
            </figure>
            <div class="has-text-centered mt-3 content">Elecciones, Asambleas y Juntas</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {  
  data() {
    return {      
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