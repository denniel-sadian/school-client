<template>
  <div class="cont w3-card-4">
    <div v-if="!editing" class="details">
      <h3 class="w3-text-green"><i class="fas fa-key"></i> {{ perm.code }}</h3>
      <p>For section: {{ sectionName }}</p>
      <p class="w3-small">{{ new Date(perm.date).toDateString() }}</p>
    </div>
    <form @submit.prevent="update" v-else>
      <div class="inpt">
        <label>For Section:</label>
        <select v-model="section" :disabled="updating" required>
          <option v-for="s in sections" :value="s.url" :key="s.id">{{
            s.name
          }}</option>
        </select>
      </div>
      <div class="inpt">
        <label>Permission Code:</label>
        <input
          type="text"
          v-model="code"
          maxlength="50"
          required
          :disabled="updating"
        />
      </div>
    </form>
    <div class="btns">
      <button
        v-show="!editing"
        @click="editing = true"
        :disabled="updating || deleting"
        class="w3-button w3-green"
      >
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button
        v-show="!editing"
        @click="deletePerm"
        :disabled="updating || deleting"
        class="w3-button w3-pink"
      >
        <i v-if="!deleting" class="fas fa-trash-alt"></i>
        <i v-else class="fas fa-spinner w3-spin"></i>
      </button>
      <button
        @click="update"
        v-show="editing"
        :disabled="updating || deleting"
        class="w3-button w3-green"
      >
        <i v-if="!updating" class="fas fa-save"></i>
        <i v-else class="fas fa-spinner w3-spin"></i>
      </button>
      <button
        v-show="editing"
        @click="editing = false"
        :disabled="updating || deleting"
        class="w3-button w3-pink"
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
      section: '',
      code: ''
    }
  },
  computed: {
    sectionName() {
      return this.sections.filter((p) => p.url === this.perm.section)[0].name
    }
  },
  watch: {
    editing(v) {
      if (v) {
        this.section = this.perm.section
        this.code = this.perm.code
      }
    }
  },
  methods: {
    async deletePerm() {
      this.deleting = true
      await this.$store
        .dispatch('grading/deletePerm', this.perm.url)
        .finally(() => (this.deleting = false))
    },
    async update() {
      this.updating = true
      const payload = {
        url: this.perm.url,
        section: this.section,
        code: this.code
      }
      await this.$store.dispatch('grading/updatePerm', payload).finally(() => {
        this.updating = false
        this.editing = false
      })
    }
  }
}
</script>

<style scoped>
.cont {
  border: 2px solid #9e9e9e;
  border-radius: 4px;
  padding: 8px;
  margin: 64px 0px;
}

.btns {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid #9e9e9e;
}

.btns button {
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-left: 8px;
}
</style>
