<template>
  <div class="cont">
    <div class="details">
      <div class="head">
        <img v-if="card.student.photo" :src="card.student.photo" />
        <img v-else src="/anon_avatar.png" />
        <div>
          <h3>{{ card.student.first_name }} {{ card.student.last_name }}</h3>
          <p>Department: {{ card.student.department.name }}</p>
          <p>Section: {{ card.student.section.name }}</p>
          <p>Semester: {{ card.sem }}</p>
          <p>Grading: {{ card.grading }}</p>
          <table>
            <tr v-for="g in card.final_grades" :key="g.url">
              <th>{{ g.subject }}</th>
              <td>{{ g.score }}</td>
            </tr>
          </table>

          <p v-if="!editing" class="remarks">
            <b>Teaher's Remarks:</b> <br />
            {{ card.remarks }}
          </p>
          <form @submit.prevent="update" v-else>
            <div class="inpt">
              <label>Teacher's Remarks:</label>
              <input
                type="text"
                v-model="remarks"
                maxlength="255"
                :disabled="upadting"
              />
            </div>
          </form>
        </div>
      </div>
      <div v-show="role === 'teacher'" class="edit">
        <button
          @click="editing = true"
          v-show="!editing"
          class="w3-button w3-green"
          :disabled="upadting"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          v-show="editing"
          @click="update"
          :disabled="upadting"
          class="w3-button w3-green"
        >
          <i v-if="!upadting" class="fas fa-save"></i>
          <i v-else class="fas fa-spinner w3-spin"></i>
        </button>
        <button
          v-show="editing"
          :disabled="upadting"
          @click="editing = false"
          class="w3-button w3-pink"
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
    card: Object
  },
  data() {
    return {
      editing: false,
      upadting: false,
      remarks: ''
    }
  },
  compute: {
    role() {
      return this.$store.state.user.user.profile.role
    }
  },
  watch: {
    editing(v) {
      if (v) this.remarks = this.card.remarks
    }
  },
  methods: {
    async update() {
      this.upadting = true
      const payload = {
        url: this.card.url,
        remarks: this.remarks
      }
      await this.$store.dispatch('grading/updateCard', payload).finally(() => {
        this.editing = false
        this.upadting = false
      })
    }
  }
}
</script>

<style scoped>
.cont {
  border: 2px solid #9e9e9e;
  border-radius: 4px;
  margin: 50px 0px;
  padding: 8px;
}

.edit {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #9e9e9e;
  padding-top: 8px;
  margin-top: 8px;
}

.edit button {
  border-radius: 100%;
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
}

.head {
  display: grid;
  grid-template-columns: auto 1fr;
}

.head img {
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;
  border-radius: 100%;
}

.head > div {
  padding: 0px 8px;
}

.head > div > * {
  margin: 4px 0px;
}

table {
  width: 100%;
}

table,
th,
td {
  border: 1px solid #9e9e9e;
  font-family: 'Nunito';
}
th {
  text-align: left;
  padding-left: 8px;
}
td {
  text-align: center;
}
</style>
