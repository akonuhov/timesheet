<template>
  <layout-main>
    <v-layout wrap>
      <v-flex class="mb-4">
        <h1 class="headline">Список табелей</h1>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex>
          <v-data-table
            :headers="headers"
            :items="timesheet"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ null }}</td>
              <td class="text-xs-right">{{ null }}</td>
              <td class="text-xs-right">{{ null }}</td>
              <td class="text-xs-right">{{ null }}</td>
              <td class="text-xs-right">{{ null }}</td>
              <td class="text-xs-right">{{ null }}</td>
            </template>
          </v-data-table>
      </v-flex>
    </v-layout>
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
