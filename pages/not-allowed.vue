<template>
  <div>
    <header>
      <h1>
        <i class="fas fa-exclamation-triangle w3-text-red"></i> Not Allowed!
      </h1>
      <p>You are not an admin to view that page.</p>
    </header>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  margin-top: 60px;
  padding: 64px 0px !important;
  text-align: center;
}

header h1 {
  text-transform: capitalize;
}
</style>
