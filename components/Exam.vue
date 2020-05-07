<template>
  <div class="cont w3-card-4 w3-white">
    <div v-if="got < 1 + this.exam.sheets.length" class="w3-center">
      <h1><i class="fas fa-spinner w3-spin w3-text-gray"></i></h1>
    </div>
    <div v-else class="w3-animate-opacity">
      <p>Exam for these grading sheets:</p>
      <div class="sheet" v-for="s in sheets" :key="s.url">
        <span
          class="w3-tag w3-round-xxlarge w3-text-green w3-white w3-border w3-border-green"
          >{{ s.section }}</span
        >
        <span
          class="w3-tag w3-round-xxlarge w3-text-pink w3-white w3-border w3-border-pink"
          >{{ s.subject }}</span
        >
        <span
          class="w3-tag w3-round-xxlarge w3-text-blue w3-white w3-border w3-border-blue"
          >{{ s.sem === 1 ? 'First Sem' : 'Second Sem' }}</span
        >
        <span
          class="w3-tag w3-round-xxlarge w3-text-purple w3-white w3-border w3-border-purple"
          >{{ s.grading }}</span
        >
      </div>
    </div>
    <div class="link">
      <nuxt-link :to="`/exams/${this.exam.id}`" class="w3-green w3-button"
        ><i class="fas fa-long-arrow-alt-right"></i> View</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exam: Object
  },
  data() {
    return {
      got: 0,
      teacher: {},
      sheets: []
    }
  },
  methods: {
    async getName(url) {
      const { data } = await this.$axios.get(url)
      return data.name
    }
  },
  async mounted() {
    await this.$axios.get(this.exam.teacher).then(({ data }) => {
      this.teacher = data
      this.got++
    })
    this.exam.sheets.forEach(async (s) => {
      await this.$axios.get(s).then(async ({ data }) => {
        let sheet = data
        sheet.subject = await this.getName(data.subject)
        sheet.section = await this.getName(data.section)
        this.sheets.push(sheet)
        this.got++
      })
    })
  }
}
</script>

<style scoped>
.cont {
  margin-bottom: 64px;
  border: 2px solid black;
  border-radius: 4px;
  padding: 8px;
}

.sheet {
  margin-bottom: 16px;
}

.link {
  text-align: right;
  border-top: 1px solid #9e9e9e;
  padding-top: 8px;
}

.w3-button {
  padding: 4px 16px;
  border-radius: 4px;
  transition: 0.3s;
}
</style>
