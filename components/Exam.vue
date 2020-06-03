<template>
  <div v-show="shouldShow" class="cont w3-card-4 w3-white">
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
          class="w3-tag w3-round-xxlarge w3-text-purple w3-white w3-border w3-border-purple"
          >{{ s.grading }} Quarter</span
        >
      </div>
      <p class="w3-small">
        {{ teacher.profile.gender === 'm' ? 'Mr.' : 'Ms.' }}
        {{ teacher.first_name }} {{ teacher.last_name }}
      </p>
      <p class="w3-small">
        {{ new Date(exam.date).toDateString() }}
      </p>
      <p class="w3-small" v-show="exam.published">Published</p>
      <div class="link">
        <nuxt-link
          :to="`/dashboard/exams/${this.exam.id}`"
          class="w3-green w3-button"
          ><i class="fas fa-long-arrow-alt-right"></i> View</nuxt-link
        >
      </div>
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
      shouldShow: true,
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
    if (this.exam.sheets.length === 0) {
      this.shouldShow = false
      await this.$axios.delete(this.exam.url)
    }
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
  padding: 8px;
  padding-top: 12px;
  border: 1px solid #9e9e9e;
  background: #f1f1f1;
  border-radius: 4px;
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
