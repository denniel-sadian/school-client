<template>
  <div class="cont">
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
  </div>
</template>

<script>
export default {
  props: {
    work: Object
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
* {
  font-family: 'Nunito';
}

.cont {
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0px;
}

h4 {
  margin: 0px;
}

th {
  font-family: 'Courier New', Courier, monospace;
  vertical-align: baseline;
  text-align: left;
}
</style>
