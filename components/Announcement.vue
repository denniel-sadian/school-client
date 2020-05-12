<template>
  <div v-show="displayed" class="ann w3-animate-zoom w3-card-4">
    <div class="top">
      <img :src="photo" alt="" />
      <div>
        <h4>{{ addressing }} {{ fullname }}</h4>
        <p class="w3-small">
          <i class="fas fa-calendar-alt"></i>
          {{ date }} - {{ time }}
        </p>
      </div>
    </div>
    <p class="text">{{ announcement.message }}</p>
    <button v-show="ownedByUser" @click="deleteAnn" class="w3-button w3-pink">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    announcement: Object
  },
  data() {
    return { displayed: true }
  },
  computed: {
    photo() {
      const p = this.announcement.staff.profile.photo
      if (p !== null) return p
      return '/anon_avatar.png'
    },
    fullname() {
      return `${this.announcement.staff.first_name} ${this.announcement.staff.last_name}`
    },
    addressing() {
      return this.announcement.staff.profile.gender === 'm' ? 'Mr.' : 'Ms.'
    },
    ownedByUser() {
      return (
        this.$store.state.user.user.user.username ===
        this.announcement.staff.username
      )
    },
    date() {
      return new Date(this.announcement.date).toLocaleDateString()
    },
    time() {
      return new Date(this.announcement.date).toLocaleTimeString()
    }
  },
  methods: {
    deleteAnn() {
      this.displayed = false
      this.$store.dispatch('information/deleteAnn', this.announcement.url)
    }
  }
}
</script>

<style scoped>
.ann {
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin: 64px 0px;
  position: relative;
}

.top {
  display: flex;
}

.top div * {
  margin: 0px;
}

img {
  max-width: 50px;
  max-height: 50px;
  min-width: 50px;
  min-height: 50px;
  object-fit: cover;
  border-radius: 100%;
  border: 1px solid #9e9e9e;
  margin-right: 8px;
}

.text {
  border-left: 3px solid #9e9e9e;
  padding: 12px 8px;
  margin-bottom: 0px;
}

button {
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 16px;
  right: 16px;
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
  border-radius: 100%;
}

.ann:hover button {
  display: flex;
}
</style>
