<template>
  <div class="cont w3-card-4">
    <div class="display">
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
    <button class="del"><i class="fas fa-trash-alt"></i> Delete Account</button>
  </div>
</template>

<script>
export default {
  props: {
    staff: Object
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.user.profile.role === 'admin'
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
  bottom: 8px;
  right: 8px;
}
</style>
