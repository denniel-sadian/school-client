<template>
  <div class="cont w3-light-gray w3-card-4" v-show="!deleting">
    <div class="details">
      <div class="head">
        <img
          class="w3-khaki"
          v-if="card.student.photo"
          :src="card.student.photo"
        />
        <img class="w3-khaki" v-else src="/anon_avatar.png" />
        <div>
          <h3>{{ card.student.first_name }} {{ card.student.last_name }}</h3>
          <p>Department: {{ card.student.department.name }}</p>
          <p>Section: {{ card.student.section.name }}</p>
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
                :disabled="updating"
              />
            </div>
          </form>
        </div>
      </div>
      <div v-if="role === 'teacher' && !confirmDelete" class="edit">
        <button
          @click="editing = true"
          v-show="!editing"
          class="w3-button w3-green"
          :disabled="updating"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          v-show="!editing"
          @click="confirmDelete = true"
          :disabled="updating || deleting"
          class="w3-button w3-pink"
        >
          <i class="fas fa-trash-alt "></i>
        </button>
        <button
          v-show="editing"
          @click="update"
          :disabled="updating"
          class="w3-button w3-green"
        >
          <i v-if="!updating" class="fas fa-save"></i>
          <i v-else class="fas fa-spinner w3-spin"></i>
        </button>
        <button
          v-show="editing"
          :disabled="updating"
          @click="editing = false"
          class="w3-button w3-pink"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div v-else-if="role === 'teacher'" class="w3-center">
        <p>
          <i class="fas fa-exclamation-triangle w3-text-red"></i> Are you sure,
          you want to delete this card?
        </p>
        <button class="w3-button w3-small w3-round w3-pink" @click="deleteCard">
          Yes
        </button>
        <button
          class="w3-button w3-small w3-round w3-green"
          @click="confirmDelete = false"
        >
          No
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
      updating: false,
      deleting: false,
      confirmDelete: false,
      remarks: ''
    }
  },
  computed: {
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
    async deleteCard() {
      this.deleting = true
      await this.$store
        .dispatch('grading/deleteCard', this.card.url)
        .finally(() => (this.deleting = false))
    },
    async update() {
      this.updating = true
      const payload = {
        url: this.card.url,
        remarks: this.remarks
      }
      await this.$store.dispatch('grading/updateCard', payload).finally(() => {
        this.editing = false
        this.updating = false
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
