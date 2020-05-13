<template>
  <header>
    <div class="w3-animate-zoom">
      <h1><i class="fas fa-paper-plane w3-text-green"></i><br />e-mail Sent</h1>
      <p>
        An account verification link was sent to your email address. Go to your
        inbox (or spam) section of your mail and click the link to activate your
        account.
      </p>
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
