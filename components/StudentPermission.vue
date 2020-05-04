<template>
  <div class="cont w3-card-4 w3-animate-zoom">
    <div v-if="!editing" class="details">
      <h2><i class="fas fa-key w3-text-yellow"></i> {{ perm.code }}</h2>
      <p>For {{ perm.section }}</p>
    </div>
    <form @submit.prevent="update" v-else>
      <div class="inpt">
        <label>Section:</label>
        <select v-model="section" :disabled="updating || deleting" required>
          <option v-for="sec in sections" :value="sec.name" :key="sec.id">{{
            sec.name
          }}</option>
        </select>
      </div>
      <div class="inpt">
        <label>Code:</label>
        <input
          type="text"
          v-model="code"
          :disabled="updating || deleting"
          required
        />
      </div>
    </form>
    <p v-show="error" class="w3-small w3-text-red w3-center">
      Please provide a unique value for the code.
    </p>
    <div class="btns">
      <button
        v-show="!editing"
        @click="editing = true"
        :disabled="updating || deleting"
        class="w3-green w3-button"
      >
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button
        v-show="!editing"
        @click="deletePerm"
        :disabled="updating || deleting"
        class="w3-pink w3-button"
      >
        <i v-if="!deleting" class="fas fa-trash-alt"></i>
        <i v-else class="fas fa-spinner w3-spin"></i>
      </button>
      <button
        v-show="editing"
        @click="update"
        :disabled="updating || deleting"
        class="w3-green w3-button"
      >
        <i v-if="!updating" class="fas fa-save"></i>
        <i v-else class="fas fa-spinner w3-spin"></i>
      </button>
      <button
        v-show="editing"
        @click="editing = false"
        :disabled="updating || deleting"
        class="w3-pink w3-button"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perm: Object,
    sections: Array
  },
  data() {
    return {
      editing: false,
      updating: false,
      deleting: false,
      error: false,
      code: '',
      section: ''
    }
  },
  watch: {
    editing(v) {
      if (v) {
        this.code = this.perm.code
        this.section = this.perm.section
      }
    }
  },
  methods: {
    async deletePerm() {
      this.deleting = true
      await this.$store.dispatch('registration/deletePerm', this.perm.url)
    },
    async update() {
      this.updating = true
      this.error = false
      const payload = {
        url: this.perm.url,
        code: this.code,
        section: this.section
      }
      await this.$store
        .dispatch('registration/updatePerm', payload)
        .then(() => (this.editing = false))
        .catch(() => (this.error = true))
        .finally(() => (this.updating = false))
    }
  }
}
</script>

<style scoped>
.cont {
  padding: 16px;
  margin: 64px 0px;
  border: 2px solid black;
  border-radius: 4px;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.btns button {
  margin-left: 8px;
  min-width: 35px;
  min-height: 35px;
  max-width: 35px;
  max-height: 35px;
  border-style: none;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.btns button:hover {
  background: lightgray !important;
  color: black !important;
}
</style>
