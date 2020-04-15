<template>
  <div class="cont">
    <div class="display">
      <h3 :class="{ 'w3-text-green': perm.used }">{{ perm.code }}</h3>
      <p>
        This permission was given to
        {{ perm.gender === 'm' ? 'Mister' : 'Miss' }} {{ perm.first_name }}
        {{ perm.last_name }} by {{ perm.from_who.first_name }}
        {{ perm.from_who.last_name }} to create
        {{ perm.role === 'admin' ? "an admin's" : "a teacher's" }} account on
        the system.
        <span v-show="perm.used" class="w3-opacity"
          >This permission has been used already.</span
        >
      </p>
      <p class="w3-small">{{ new Date(perm.date).toDateString() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perm: Object
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
</style>
