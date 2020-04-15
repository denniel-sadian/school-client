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
      <p v-if="loadingPerms" class="w3-center">
        <i class="fas fa-spinner w3-spin"></i>
      </p>
      <div v-else class="w3-content">
        <div v-if="permissions.length === 0" class="w3-center">
          <h4>There are no permissions yet.</h4>
        </div>
        <div v-else>
          <RegPerm v-for="perm in permissions" :perm="perm" :key="perm.id" />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import RegPerm from '~/components/RegPerm.vue'

export default {
  middleware: 'isAdmin',
  components: { RegPerm },
  data() {
    return { loadingPerms: true }
  },
  computed: {
    permissions() {
      return this.$store.state.user.permissions
    }
  },
  async mounted() {
    await this.$store.dispatch('user/getPerms').then(() => {
      this.loadingPerms = false
    })
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
