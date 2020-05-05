<template>
  <div class="cont w3-card-4">
    <div class="display w3-animate-opacity" v-if="!confirmDelete">
      <div>
        <img v-if="staff.profile.photo" :src="staff.profile.photo" />
        <img v-else src="/anon_avatar.png" />
        <h4>
          <span v-if="staff.profile.gender === 'm'">Mr.</span
          ><span v-else>Ms.</span> {{ staff.first_name }} {{ staff.last_name }}
          <span class="w3-tag w3-small w3-yellow w3-round-xxlarge">{{
            staff.profile.role
          }}</span>
        </h4>
      </div>
      <div>
        <table>
          <tr>
            <th>Username:</th>
            <td>{{ staff.username }}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{{ staff.email }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else class="w3-center w3-animate-opacity">
      <div v-if="!deleting">
        <h4>
          <i class="fas fa-exclamation-triangle w3-text-red"></i> Warning!
        </h4>
        <p>
          Are you sure, you want to remove the account of
          <span v-if="staff.profile.gender === 'm'">Mr.</span
          ><span v-else>Ms.</span> {{ staff.first_name }} {{ staff.last_name }}?
        </p>
        <button
          @click="deleteStaff"
          class="w3-button w3-small w3-pink w3-round"
        >
          Yes
        </button>
        <button
          @click="confirmDelete = false"
          class="w3-button w3-small w3-green w3-round"
        >
          No
        </button>
      </div>
      <div v-else class="w3-animate-opacity">
        <h1><i class="fas fa-spinner w3-spin w3-text-blue"></i></h1>
      </div>
    </div>
    <button
      v-show="isAdmin && !confirmDelete"
      @click="confirmDelete = true"
      class="del w3-button w3-pink w3-round-xxlarge w3-card-4 w3-animate-opacity"
    >
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    staff: Object
  },
  data() {
    return {
      confirmDelete: false,
      deleting: false
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.user.profile.role === 'admin'
    }
  },
  methods: {
    async deleteStaff() {
      this.deleting = true
      await this.$store.dispatch('information/deleteStaff', this.staff.id)
    }
  }
}
</script>

<style scoped>
.cont {
  border: 2px solid black;
  border-radius: 4px;
  margin: 64px 0px;
  padding: 8px;
  position: relative;
}

.display > div:first-child {
  display: flex;
  align-items: center;
}

.display > div:last-child {
  width: 100%;
  overflow-x: auto;
}

img {
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
  border: 1px solid #9e9e9e;
  background: #9e9e9e;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 8px;
}

h4 {
  font-size: 800;
  font-family: 'Roboto Slab', serif !important;
}

table {
  margin-top: 8px;
  width: 100%;
}

th {
  font-family: 'Courier New', Courier, monospace;
  text-align: left;
}

th,
td {
  border: 1px solid #9e9e9e;
  padding-left: 8px;
}

.del {
  position: absolute;
  top: 8px;
  right: 8px;
  display: none;
  min-width: 35px;
  min-height: 35px;
  max-width: 35px;
  max-height: 35px;
  display: none;
  justify-content: center;
  align-items: center;
}

.cont:hover .del {
  display: flex;
}
</style>
