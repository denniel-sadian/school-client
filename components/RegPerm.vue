<template>
  <div class="cont">
    <div class="display">
      <h3 :class="{ 'w3-text-green': perm.used }">
        <i class="fas fa-key"></i> {{ perm.code }}
      </h3>
      <p>
        This permission was given to
        <b
          >{{ perm.gender === 'm' ? 'Mister' : 'Miss' }} {{ perm.first_name }}
          {{ perm.last_name }}</b
        >
        by {{ perm.from_who.first_name }} {{ perm.from_who.last_name }} to
        create
        {{ perm.role === 'admin' ? "an admin's" : "a teacher's" }} account on
        the system.
        <span v-show="perm.used" class="w3-opacity"
          >This permission has been used already.</span
        >
      </p>
      <p class="w3-small">{{ new Date(perm.date).toDateString() }}</p>
      <div class="btn" v-show="perm.from_who.username === username">
        <button class="w3-button w3-round w3-small w3-border w3-border-black">
          <i class="fas fa-pencil-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perm: Object
  },
  data() {
    return {
      editing: false
    }
  },
  computed: {
    username() {
      return this.$store.state.user.user.user.username
    }
  }
}
</script>

<style scoped>
.cont {
  padding: 16px;
  border: 1px solid black;
  border-radius: 4px;
  margin: 16px 0px;
}

h3 {
  font-weight: 800;
}

.btn {
  display: flex;
  justify-content: flex-end;
}

.btn button {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
}
</style>
