<template>
  <v-flex xs12>
    <v-data-table
      :headers="headers"
      :items="getSelectSubdivisionWorkerGroup"
    >
      <template v-slot:items="props">
        <td align="center">{{ props.index + 1 }}</td>
        <td align="left" class="px-0">
          <table>
            <tr>
              <td>{{ props.item.full_name }}</td>
            </tr>
            <tr>
              <td>{{ props.item.position }}</td>
            </tr>
          </table>
        </td>
        <td align="center">{{ props.item.in }}</td>
        <td valign="bottom" class="px-0" align="center">
          <table>
            <tbody>
            <tr>
              <td align="center">План</td>
            </tr>
            <tr>
              <td align="center">План</td>
            </tr>
            <tr>
              <td align="center">Факт</td>
            </tr>
            <tr>
              <td align="center">Факт</td>
            </tr>
            </tbody>
          </table>
        </td>
        <td class="px-0">
          <table class="v-table">
            <thead>
            <tr>
              <th v-for="(item, index) in props.item.timesheet.plan[0].days" v-bind:key="index" align="center">
                {{ item.number }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td v-for="(item, index) in props.item.timesheet.plan[0].days" v-bind:key="index" align="center">
                <v-edit-dialog
                  :return-value.sync="item.status"
                  lazy
                > {{ item.status }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.status"
                      @input="onInputTimesheetPlanStatus"
                      label="Редактировать"
                      single-line
                      counter
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) in props.item.timesheet.plan[0].days" v-bind:key="index" align="center">
                <v-edit-dialog
                  :return-value.sync="item.time"
                  lazy
                > {{ item.time }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.time"
                      label="Редактировать"
                      single-line
                      counter
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) in props.item.timesheet.actual[0].days" v-bind:key="index" align="center">
                <v-edit-dialog
                  :return-value.sync="item.status"
                  lazy
                > {{ item.status }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.status"
                      label="Редактировать"
                      single-line
                      counter
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
            <tr>
              <td v-for="(day, index) in props.item.timesheet.actual[0].days" v-bind:key="index" align="center">
                <v-edit-dialog
                  :return-value.sync="day.time"
                  lazy
                > {{ day.time }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="day.time"
                      label="Редактировать"
                      single-line
                      counter
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
        <td valign="bottom" class="px-0" align="center">
          <table>
            <tbody>
            <tr>
              <td align="center">0</td>
            </tr>
            <tr>
              <td align="center">0</td>
            </tr>
            <tr>
              <td align="center">0</td>
            </tr>
            <tr>
              <td align="center">0</td>
            </tr>
            </tbody>
          </table>
        </td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
export default {
  name: 'Timesheet',
  props: {
    workersList: Array
  },
  data () {
    return {
      headers: [
        { text: '№пп', value: 'id' },
        { text: 'Сотрудник/должность', value: 'worker' },
        { text: 'Индентификатор', value: 'name', align: 'center', sortable: false },
        { text: 'Табель', value: 'type', align: 'center', sortable: false },
        { text: 'День/Часы', value: 'days', align: 'center', sortable: false },
        { text: 'Итого', value: 'total', align: 'center, sortable: false' }
      ]
    }
  },
  computed: {
    getSelectSubdivisionWorkerGroup () {
      return this.workersList
    }
  },
  methods: {
    onInputTimesheetPlanStatus () {
      // this.$store.commit('Worker/UPDATE', this.workersList)
    }
  }
}
</script>

<style scoped>

</style>
