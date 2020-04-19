<template>
  <div class="cont w3-hover-shadow w3-animate-top">
    <div v-if="!editing && !deleting" class="w3-animate-opacity">
      <h4 class="w3-text-blue">{{ work.name }}</h4>
      <table>
        <tr>
          <th>Highest Score:</th>
          <td>{{ work.highest_score }}</td>
        </tr>
        <tr>
          <th>Date:</th>
          <td>{{ new Date(work.date).toDateString() }}</td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>{{ workType }}</td>
        </tr>
      </table>

      <p class="w3-small w3-text-red-w3-center" v-show="errorDelete">
        You cannot delete this work for now because this has records already.
      </p>
      <div id="btns">
        <button
          @click="editing = true"
          class="w3-button w3-small w3-light-green"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button @click="deleting = true" class="w3-button w3-small w3-pink">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <div
      id="deleting"
      v-else-if="deleting && !editing"
      class="w3-animate-opacity"
    >
      <div v-if="deletingReally">
        <h1><i class="fas fa-spinner w3-spin"></i></h1>
      </div>
      <div v-else class="w3-animate-zoom w3-yellow w3-padding">
        <h4>
          <i class="fas fa-exclamation-triangle w3-text-red"></i><br />Are you
          sure you want to delete this work?
        </h4>
        <div>
          <button
            @click="deleteWork"
            class="w3-button w3-red w3-round w3-small"
          >
            Yes
          </button>
          <button
            @click="deleting = false"
            class="w3-button w3-green w3-round w3-small"
          >
            No
          </button>
        </div>
      </div>
    </div>
    <form v-else @submit.prevent="update" class="w3-animate-opacity">
      <div class="inpt">
        <label>Name:</label>
        <input v-model="name" :disabled="updating" required />
      </div>
      <div class="inpt">
        <label>Type:</label>
        <select v-model="type" :disabled="updating" required>
          <option value="a">Activity</option>
          <option value="q">Quiz</option>
          <option value="e">Examination</option>
          <option value="p">Performance</option>
          <option value="c">Extra</option>
        </select>
      </div>
      <div class="inpt">
        <label>Highest Score:</label>
        <input type="number" v-model="score" :disabled="updating" required />
      </div>
      <div>
        <button
          type="submit"
          :disabled="updating"
          class="w3-button w3-green w3-round w3-small"
        >
          <span v-if="updating"
            ><i class="fas fa-spinner w3-spin"></i> Updating...</span
          >
          <span v-else>Update</span>
        </button>
        <button
          @click="editing = false"
          :disabled="updating"
          class="w3-button w3-pink w3-round w3-small"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    work: Object
  },
  data() {
    return {
      editing: false,
      deleting: false,
      deletingReally: false,
      errorDelete: false,
      updating: false,

      name: '',
      type: '',
      score: 0
    }
  },
  watch: {
    editing(v) {
      if (v) {
        this.name = this.work.name
        this.type = this.work.work_type
        this.score = this.work.highest_score
      }
    }
  },
  computed: {
    sheetUrl() {
      return this.$store.state.grading.currentSheet.url
    },
    workType() {
      switch (this.work.work_type) {
        case 'a':
          return 'Activity'
        case 'q':
          return 'Quiz'
        case 'e':
          return 'Examination'
        case 'p':
          return 'Performace'
        case 'c':
          return 'Extra'
      }
    }
  },
  methods: {
    async deleteWork() {
      this.deletingReally = true
      await this.$store
        .dispatch('grading/deleteWork', this.work.url)
        .catch(() => {
          this.errorDelete = true
          setTimeout(() => (this.errorDelete = false), 5000)
        })
        .finally(() => (this.deleting = false))
    },
    async update() {
      this.deleting = false
      this.editing = true
      this.updating = true
      const payload = {
        url: this.work.url,
        gsheet: this.sheetUrl,
        name: this.name,
        work_type: this.type,
        highest_score: this.score
      }
      await this.$store
        .dispatch('grading/updateWork', payload)
        .then(() => (this.editing = false))
        .finally(() => (this.updating = false))
    }
  }
}
</script>

<style scoped>
h4,
td {
  font-family: 'Nunito';
}

.cont {
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  padding: 8px;
  margin: 16px 0px;
}

h4 {
  margin: 0px;
}

th {
  font-family: 'Courier New', Courier, monospace;
  vertical-align: baseline;
  text-align: left;
}

#btns {
  display: flex;
  justify-content: flex-end;
}

#btns button {
  min-width: 35px;
  max-width: 35px;
  min-height: 35px;
  max-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  border-radius: 32px;
}

form > div:last-child {
  display: flex;
  justify-content: flex-end;
}

form > div:last-child button {
  margin-left: 8px;
}

#deleting {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
#deleting > * {
  width: 100%;
}
</style>
