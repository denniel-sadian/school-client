<template>
  <tr>
    <td>{{ record.name }}</td>
    <td class="w3-center">{{ col0 }}</td>
    <td class="w3-center">{{ col1 }}</td>
    <td class="w3-center">{{ col2 }}</td>
    <td class="w3-center">{{ col3 }}</td>
    <td class="w3-center">{{ final }}</td>
    <td v-if="remark === 'PASSED'" class="w3-center w3-text-green">
      {{ remark }}
    </td>
    <td v-else class="w3-center w3-text-red">{{ remark }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    record: Object,
    isMAPEH: Boolean
  },
  computed: {
    col0() {
      if (!this.isMAPEH)
        return this.record.grades.filter((g) => g.col === 0)[0].grade
      else
        return this.record.grades.filter((g) =>
          g.subject.toLowerCase().includes('music')
        )[0].grade
    },
    col1() {
      if (!this.isMAPEH)
        return this.record.grades.filter((g) => g.col === 1)[0].grade
      else
        return this.record.grades.filter((g) =>
          g.subject.toLowerCase().includes('arts')
        )[0].grade
    },
    col2() {
      if (!this.isMAPEH)
        return this.record.grades.filter((g) => g.col === 2)[0].grade
      else
        return this.record.grades.filter((g) =>
          g.subject.toLowerCase().includes('physical education')
        )[0].grade
    },
    col3() {
      if (!this.isMAPEH)
        return this.record.grades.filter((g) => g.col === 3)[0].grade
      else
        return this.record.grades.filter((g) =>
          g.subject.toLowerCase().includes('health')
        )[0].grade
    },
    final() {
      return (this.col0 + this.col1 + this.col2 + this.col3) / 4
    },
    remark() {
      return this.final >= 75 ? 'PASSED' : 'FAILED'
    }
  }
}
</script>

<style scoped>
td {
  border: 1px solid black;
  white-space: nowrap;
  padding: 4px 8px;
}
</style>
