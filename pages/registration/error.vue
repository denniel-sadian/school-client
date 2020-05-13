<template>
  <header>
    <div class="w3-animate-zoom">
      <h1><i class="fas fa-times w3-text-red"></i><br />Invalid</h1>
      <p>
        This is an invalid verification link.
      </p>
    </div>
  </header>
</template>

<script>
export default {
  layout: 'full_height_body',
  head: {
    title: 'School | Invalid'
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
