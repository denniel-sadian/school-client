<template>
  <div>
    <header class="w3-container">
      <div class="w3-content w3-center">
        <h1>Account Registration Permissions</h1>
        <p>
          This page can only be accessed by the admins. Before anyone creates an
          account, an admin must provide a permission first.
        </p>
        <p>
          <button @click="showModal = true" class="w3-button w3-round w3-green">
            <i class="fas fa-plus-circle"></i> Create Permission
          </button>
        </p>
      </div>
    </header>
    <div class="w3-modal" :class="{ 'w3-show': showModal }">
      <div class="w3-modal-content">
        <div class="w3-green w3-padding">
          <h2>Create permission</h2>
        </div>
        <div class="w3-padding"></div>
      </div>
    </div>
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
    return {
      loadingPerms: true,
      showModal: false
    }
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

.inpt {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 16px;
}

.inpt label {
  font-size: 12px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.inpt input {
  border-radius: 4px;
  border: 1px solid gray;
  height: 40px;
  transition: 0.3s;
  padding: 0px 8px;
}
</style>
