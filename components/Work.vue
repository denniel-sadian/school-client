<template>
  <div>
    <h4>{{ work.name }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    work
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
</style>
