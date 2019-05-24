<template>
  <layout-main>
    <v-data-table
      :headers="headers"
      :items="timesheet"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
    </v-data-table>
  </layout-main>
</template>

<script>
import LayoutMain from '../layouts/Main.vue'
export default {
  name: 'PageTimesheetAdd',
  components: {
    LayoutMain: LayoutMain
  },
  data: () => ({
    headers: [
      { text: 'Подразделение', value: 'subdivision' },
      { text: 'Номер подразделения', value: 'subdivision_number' },
      { text: 'Сотрудник', value: 'user' },
      { text: 'Должность', value: 'position' },
      { text: 'График работы', value: 'timesheet' },
      { text: 'ИД', value: 'id' }
    ],
    timesheet: []
  })
}
</script>

<style lang="scss">
</style>
