<template>
  <section class="section">    
    <h2 class="title is-3 has-text-grey">
      Votaciones <b-icon icon="star" size="is-large" />
    </h2>
  </section>
</template>

<script>
export default {
  fetch ({ store, redirect }) {
    if (!store.state.user_uid) {
      return redirect('/')
    }
  },
}
</script>