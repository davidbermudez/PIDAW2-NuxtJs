<template>
  <section class="section">    
    <h2 class="title is-3 has-text-grey">
      Perfil <b-icon icon="star" size="is-large" />
    </h2>
    <div v-if="store_user_uid">
      <div><span class="title">Nombre: </span>{{ store_user_name }}</div>
      <div><span class="title">Email: </span>{{ store_user_email }}</div>
    </div>
  </section>
</template>

<script>
export default { 
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
  fetch ({ store, redirect }) {
    if (!store.state.store_user_uid) {
      return redirect('/')
    }
  },
}
</script>