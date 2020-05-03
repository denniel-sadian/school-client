<template>
  <header>
    <div class="w3-animate-zoom">
      <h2>Viewing Permission</h2>
      <p class="w3-small w3-center">
        Please, enter the permission code that the school gave you.
      </p>
      <hr />
      <form @submit.prevent="checkCode">
        <div class="inpt">
          <label for="code">Permission Code:</label>
          <input
            type="text"
            v-model="code"
            @keypress.enter="checkCode"
            :disabled="checking"
            required
          />
        </div>
        <div class="inpt">
          <label>Student's First Name:</label>
          <input
            type="text"
            v-model="fname"
            @keypress.enter="checkCode"
            :disabled="checking"
            required
          />
        </div>
        <div class="inpt">
          <label>Student's Last Name:</label>
          <input
            type="text"
            v-model="lname"
            @keypress.enter="checkCode"
            :disabled="checking"
            required
          />
        </div>
        <p
          v-show="noCode"
          class="w3-animate-zoom w3-small w3-center w3-text-red"
        >
          Permission with this code does not exist.
        </p>
        <p
          v-show="noStudent"
          class="w3-animate-zoom w3-small w3-center w3-text-red"
        >
          This permission code exists, however, there was no report card found
          with this name.
        </p>
        <hr />
        <button
          type="submit"
          :disabled="checking"
          class="w3-button w3-light-green"
        >
          <span v-if="checking">
            <i class="fas fa-spinner w3-spin"></i> Finding...
          </span>
          <span v-else>View the Report Card</span>
        </button>
        <div class="or">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <button
          @click="$router.push('/')"
          class="w3-button w3-light-blue"
          :disabled="checking"
        >
          Home
        </button>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  layout: 'full_height_body',
  data() {
    return {
      code: '',
      fname: '',
      lname: '',
      noCode: false,
      noStudent: false,
      checking: false
    }
  },
  computed: {
    cardsLen() {
      return this.$store.state.cards.cards.length
    }
  },
  methods: {
    async checkCode() {
      if (!this.code || !this.fname || !this.lname) return
      this.checking = true
      this.noCode = false
      this.noStudent = false
      const payload = {
        code: this.code,
        fname: this.fname,
        lname: this.lname
      }
      await this.$store
        .dispatch('cards/retrieveCards', payload)
        .then(() => {
          this.noCode = false
          if (!this.cardsLen) this.noStudent = true
          else this.$router.push('/viewing-cards')
        })
        .catch(() => (this.noCode = true))
        .finally(() => (this.checking = false))
    }
  },
  head: {
    title: 'School | Check Permission Code'
  }
}
</script>

<style scoped>
header {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  padding-top: 76px;
}

header > div {
  border: 1.5px solid #9e9e9e;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  padding: 16px;
}

header h2 {
  text-align: center;
  font-family: 'Nunito' !important;
}

.w3-button {
  width: 100%;
  border-radius: 4px;
}
</style>
