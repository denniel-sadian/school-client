<template>
  <div class="cont w3-khaki">
    <header class="w3-container">
      <div class="w3-content head">
        <div>
          <img :src="photo" alt="" />
        </div>
        <div>
          <h1>{{ fullname }}</h1>
          <p>
            <span class="w3-opacity">Department:</span>
            {{ student.department.name }}
          </p>
          <p>
            <span class="w3-opacity">Section:</span> {{ student.section.name }}
          </p>
          <p>
            <span class="w3-opacity">Grade:</span> {{ student.grade_level }}
          </p>
          <p>
            <span class="w3-opacity">Gender:</span>
            {{ student.gender === 'm' ? 'Male' : 'Female' }}
          </p>
        </div>
      </div>
    </header>
    <article class="w3-container">
      <div class="w3-content">
        <DisplayCard v-for="card in cards" :card="card" :key="card.id" />
      </div>
    </article>
  </div>
</template>

<script>
import DisplayCard from '~/components/DisplayCard.vue'

export default {
  components: {
    DisplayCard
  },
  computed: {
    cards() {
      return this.$store.state.cards.cards
    },
    student() {
      return this.cards[0].student
    },
    fullname() {
      return `${this.student.first_name} ${this.student.last_name}`
    },
    photo() {
      if (this.student.photo) return this.student.photo
      else return '/anon_avatar.png'
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

<style scoped>
.cont {
  padding: 64px 0px !important;
}

header {
  font-family: 'Nunito';
}

.head {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  border-bottom: 2px solid #9e9e9e;
}

.head div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}

.head img {
  object-fit: cover;
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
}
</style>
