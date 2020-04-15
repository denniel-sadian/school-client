<template>
  <div>
    <header>
      <h1>Account Registration Permissions</h1>
      <p>
        This page can only be accessed by the admins. Before anyone creates an
        account, an admin must provide a permission first.
      </p>
    </header>
    <article class="w3-container">
      <div class="w3-content">
        {{ permissions }}
      </div>
    </article>
  </div>
</template>

<script>
export default {
  middleware: 'isAdmin',
  computed: {
    permissions() {
      return this.$store.state.user.permissions
    }
  },
  mounted() {
    this.$store.dispatch('user/getPerms')
  }
}
</script>

<style scoped>
header {
  margin-top: 53px;
  padding: 64px 0px !important;
  text-align: center;
}

header h1 {
  text-transform: capitalize;
}
</style>
