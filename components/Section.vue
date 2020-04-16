<template>
  <div class="cont" v-show="!hide">
    <div class="display" v-if="!editing">
      <h3><i class="fas fa-school"></i> {{ sec.name }}</h3>
      <p class="w3-center w3-small w3-text-red" v-show="errorDelete">
        You cannot delete this section right now because some objects like
        grading sheets are in this section.
      </p>
      <div class="btn" v-show="role === 'admin'">
        <button
          @click="editing = true"
          class="w3-button w3-round w3-small w3-border w3-border-black"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          @click="deleteSec"
          class="w3-button w3-text-red w3-round w3-small w3-border w3-border-red"
        >
          <i v-if="!deleting" class="fas fa-trash-alt"></i>
          <i v-else class="fas fa-spinner w3-spin"></i>
        </button>
      </div>
    </div>
    <form v-else @submit.prevent="update">
      <div class="inpt">
        <label>Section Name:</label>
        <input type="text" v-model="name" required :disabled="updating" />
      </div>
      <hr />
      <p v-show="error" class="w3-small w3-text-red w3-center">
        Please provide a unique section name.
      </p>
      <button
        type="submit"
        :disabled="updating"
        class="w3-button w3-light-green w3-round w3-small w3"
      >
        <span v-if="updating"
          ><i class="fas fa-spinner w3-spin"></i> Updating...</span
        >
        <span v-else>Update this Section</span>
      </button>
      <button
        :disabled="updating"
        class="w3-pink w3-round w3-button w3-small"
        @click="editing = false"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    sec: Object,
    role: String
  },
  data() {
    return {
      editing: false,
      updating: false,
      deleting: false,
      error: false,
      errorDelete: false,
      hide: false,
      name: this.sec.name
    }
  },
  methods: {
    async deleteSec() {
      this.deleting = true
      await this.$axios
        .delete(`information/sections/${this.sec.id}/`)
        .then(() => {
          this.hide = true
          this.$store.dispatch('information/getSections')
        })
        .catch(() => {
          this.errorDelete = true
          setTimeout(() => {
            this.errorDelete = false
          }, 10000)
        })
        .finally(() => {
          this.deleting = false
        })
    },
    async update() {
      this.updating = true
      this.error = false
      const payload = {
        name: this.name
      }
      await this.$axios
        .put(`information/sections/${this.sec.id}/`, payload)
        .then(({ data }) => {
          this.editing = false
          this.$store.dispatch('information/getSections')
        })
        .catch(() => {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 10000)
        })
        .finally(() => {
          this.updating = false
        })
    }
  }
}
</script>

<style scoped>
.cont {
  padding: 2px 16px 2px 16px;
  border: 1px solid black;
  border-radius: 4px;
  margin: 30px 0px;
}

h3 {
  font-weight: 800;
}

.btn {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #9e9e9e;
  padding-top: 2px;
}

.btn button {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-left: 16px;
}

.w3-button {
  width: 100%;
  margin: 3px 0px;
}
</style>
