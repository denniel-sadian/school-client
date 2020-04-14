<template>
  <header>
    <div>
      <h2>Permission</h2>
      <p class="w3-small w3-center">
        Please, enter the account registration permission code that your admin
        gave you.
      </p>
      <hr />
      <div class="inpt">
        <label for="code">Permission Code:</label>
        <input type="text" v-model="code" @keypress.enter="checkCode" />
      </div>
      <p v-show="checking" class="w3-small w3-center w3-text-green">
        Checking code...
      </p>
      <p v-show="noCode" class="w3-small w3-center w3-text-red">
        There is no permission with this code.
      </p>
      <hr />
      <button
        @click="checkCode"
        :disabled="disabled"
        class="w3-button w3-light-green"
      >
        Check Code
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
      this.checking = true
      this.noCode = false
      this.disabled = true
      await this.$store
        .dispatch('registration/checkCode', this.code)
        .then(({ data }) => {
          this.noCode = false
          this.checking = false
          this.$store.commit('registration/SET_CREDENTIALS', data)
          this.$router.push('/registration/register')
        })
        .catch(() => {
          this.checking = false
          this.disabled = false
          this.noCode = true
          this.$store.commit('registration/SET_CREDENTIALS', {})
          setTimeout(() => {
            this.noCode = false
          }, 5000)
        })
    }
  }
}
</script>
