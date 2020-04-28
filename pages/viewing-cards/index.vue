<template>
  <div>
    <header>
      {{ cards }}
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    cards() {
      return this.$store.state.cards.cards
    }
  },
  mounted() {
    if (!this.cards.length) this.$router.push('/viewing-cards/check-permission')
  },
  head: {
    title: 'School | Cards'
  }
}
</script>
