<template>
  <div class="cont">
    <div class="staff">
      <h2>Are you one an admin or a teacher?</h2>
      <div>
        <nuxt-link to="/login" class="w3-button w3-round w3-green"
          >Login</nuxt-link
        >
        <nuxt-link
          to="/registration/check-code"
          class="w3-button w3-round w3-blue"
          >Register</nuxt-link
        >
      </div>
    </div>
    <div class="parent">
      <h2>Do you want to view your child's card?</h2>
      <div>
        <nuxt-link
          to="/viewing-cards/check-permission"
          class="w3-button w3-round w3-blue"
          >View Cards</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'staff parent';
}

.head {
  grid-area: head;
  background: #4caf50;
  color: white;
  padding: 32px 0px;
}

.staff {
  grid-area: staff;
  background: #f1f1f1;
}

.parent {
  grid-area: parent;
  background: #ddffdd;
}

.cont > div {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
