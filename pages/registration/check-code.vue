<template>
  <header>
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
        <button @click="checkCode" class="w3-button w3-light-green w3-round">
          Check Code
        </button>
      </div>
    </header>
  </header>
</template>

<script>
export default {
  layout: 'full_height_body',
  data() {
    return {
      code: '',
      noCode: false,
      checking: false
    }
  },
  methods: {
    async checkCode() {
      this.checking = true
      this.noCode = false
      await this.$store
        .dispatch('registration/checkCode', this.code)
        .then(({ data }) => {
          this.noCode = false
          this.checking = false
          this.$store.commit('registration/SET_CODE', this.code)
          this.$store.commit('registration/SET_CREDENTIALS', data)
        })
        .catch(() => {
          this.checking = false
          this.noCode = true
          setInterval(() => {
            this.noCode = false
          }, 5000)
        })
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100vh;
  padding: 0px;
  margin: 0px;
}

header {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

header > div {
  border: 1px solid #9e9e9e;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  padding: 16px;
}

header h2 {
  text-align: center;
}

.inpt {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 16px;
}

.inpt label {
  font-size: 12px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.inpt input {
  border-radius: 4px;
  border: 1px solid gray;
  height: 40px;
  transition: 0.3s;
  padding: 0px 8px;
}

.w3-button {
  width: 100%;
}
</style>
