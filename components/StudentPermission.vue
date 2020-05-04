<template>
  <div class="cont w3-card-4">
    <div class="details">
      <h2><i class="fas fa-key w3-text-yellow"></i> {{ perm.code }}</h2>
      <p>For {{ perm.section }}</p>
      <div class="btns">
        <button
          v-show="!editing"
          @click="editing = true"
          :disabled="updating"
          class="w3-green"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          v-show="!editing"
          @click="deletePerm"
          :disabled="updating"
          class="w3-pink"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <button
          v-show="editing"
          @click="update"
          :disabled="updating"
          class="w3-green"
        >
          <i v-if="!updating" class="fas fa-save"></i>
          <i v-else class="fas fa-spinner w3-spin"></i>
        </button>
        <button
          v-show="editing"
          @click="editing = false"
          :disabled="updating"
          class="w3-pink"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
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
