<template>
  <header>
    <div class="w3-animate-zoom">
      <h1><i class="fas fa-check w3-text-green"></i><br />Activated</h1>
      <p>
        Your account has been activated.
      </p>
      <nuxt-link to="/login" class="w3-button w3-round w3-blue w3-small"
        ><i class="fas fa-sign-in-alt"></i> Sign In</nuxt-link
      >
    </div>
  </header>
</template>

<script>
export default {
  layout: 'full_height_body',
  head: {
    title: 'School | Done'
  }
}
</script>

<style scoped>
header > div {
  overflow-y: auto;
  margin-top: 60px;
}

header {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

header > div {
  max-width: 400px;
  width: 100%;
  text-align: center;
}
</style>
