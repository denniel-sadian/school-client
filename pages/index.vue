<template>
  <div class="cont">
    <div class="staff">
      <h1 class="text">
        STAFF
      </h1>
    </div>
    <div class="parent">
      <h1 class="text">
        GUARDIAN
      </h1>
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
  background-size: cover;
  background: url('/school.png') center no-repeat;
}

.staff {
  grid-area: staff;
}

.parent {
  grid-area: parent;
}

.cont > div {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
