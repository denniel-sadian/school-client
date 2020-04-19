<template>
  <div class="cont w3-hover-shadow">
    <div v-if="!editing">
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

      <div id="btns">
        <button
          @click="editing = true"
          class="w3-button w3-small w3-light-green"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="w3-button w3-small w3-pink">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <div v-else>
      <div class="inpt">
        <label>Name:</label>
      </div>
    </div>
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

      name: '',
      type: '',
      score: 0
    }
  },
  computed: {
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
</style>
