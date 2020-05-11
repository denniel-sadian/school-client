<template>
  <div v-show="displayed" class="holder w3-animate-top">
    <div class="top">
      <img :src="photo" alt="" />
      <div>
        <h4>{{ fullname }}</h4>
        <p class="w3-small">
          <i class="fas fa-calendar-alt"></i>
          {{ new Date(comment.date).toDateString() }}
        </p>
      </div>
    </div>
    <p class="text">{{ comment.comment }}</p>
    <button
      v-show="ownedByUser"
      @click="deleteComment"
      class="w3-button w3-pink"
    >
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  data() {
    return {
      displayed: true
    }
  },
  computed: {
    photo() {
      const p = this.comment.staff.profile.photo
      if (p !== null) return p
      return '/anon_avatar.png'
    },
    fullname() {
      return `${this.comment.staff.first_name} ${this.comment.staff.last_name}`
    },
    ownedByUser() {
      return (
        this.$store.state.user.user.user.username ===
        this.comment.staff.username
      )
    }
  },
  methods: {
    deleteComment() {
      this.displayed = false
      this.$store.dispatch('exams/deleteComment', this.comment.url)
    }
  }
}
</script>

<style scoped>
.holder {
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 16px;
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

.holder:hover button {
  display: flex;
}
</style>
