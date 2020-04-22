<template>
  <header>
    <div class="w3-animate-zoom">
      <h2>Permission</h2>
      <p class="w3-small w3-center">
        Please, enter the account registration permission code that your admin
        gave you.
      </p>
      <hr />
      <form @submit.prevent="checkCode">
        <div class="inpt">
          <label for="code">Permission Code:</label>
          <input
            type="text"
            v-model="code"
            @keypress.enter="checkCode"
            :disabled="disabled"
          />
        </div>
        <p v-show="noCode" class="w3-small w3-center w3-text-red">
          Permission with this code does not exist or it has been used already.
        </p>
        <hr />
        <button
          type="submit"
          :disabled="disabled"
          class="w3-button w3-light-green"
        >
          <span v-if="checking">
            <i class="fas fa-spinner w3-spin"></i> Checking code...
          </span>
          <span v-else>Check Code</span>
        </button>
        <div class="or">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <button
          @click="$router.push('/login')"
          :disabled="disabled"
          class="w3-button w3-light-blue"
        >
          Login
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
      noCode: false,
      checking: false,
      disabled: false
    }
  },
  methods: {
    async checkCode() {
      if (!this.code) return
      this.checking = true
      this.noCode = false
      this.disabled = true
      await this.$store.dispatch('registration/checkCode', this.code)
      if (this.$store.state.registration.credentials !== null)
        this.$router.push('/registration/register')
      else {
        this.checking = false
        this.disabled = false
        this.noCode = true
        setTimeout(() => {
          this.noCode = false
        }, 10000)
      }
    }
  },
  head: {
    title: 'School | Check Registration Code'
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
