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
                  @open="item._status =  item.status"
                  @cancel="item.status = item._status || item.status"
                  @save="item.status =  item._status || item.status"
                  lazy
                > {{ item.status }}
                  <template v-slot:input>
                    <v-select
                      slot="input"
                      :items="statusSelect"
                      v-model="item._status"
                      v-on:change="item.status = item._status"
                      label="Редактировать"
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
            <tr>
              <td v-for="(day, index) in props.item.timesheet.plan[0].days" v-bind:key="index" align="center">
                <v-edit-dialog
                  @open="day._time =  day.time"
                  @cancel="day.time = day._time || day.time"
                  @save="day.time =  day._time || day.time"
                  lazy
                > {{ day.time }}
                  <template v-slot:input>
                    <v-select
                      slot="input"
                      :items="timeSelect"
                      v-model="day._time"
                      v-on:change="day.time = day._time"
                      label="Редактировать"
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) in props.item.timesheet.actual[0].days" v-bind:key="index" align="center">
                <v-edit-dialog
                  @open="item._status =  item.status"
                  @cancel="item.status = item._status || item.status"
                  @save="item.status =  item._status || item.status"
                  lazy
                > {{ item.status }}
                  <template v-slot:input>
                    <v-select
                      slot="input"
                      :items="statusSelect"
                      v-model="item._status"
                      v-on:change="item.status = item._status"
                      label="Редактировать"
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
            <tr>
              <td v-for="(day, index) in props.item.timesheet.actual[0].days" v-bind:key="index" align="center">
                <v-edit-dialog
                  @open="day._time =  day.time"
                  @cancel="day.time = day._time || day.time"
                  @save="day.time =  day._time || day.time"
                  lazy
                > {{ day.time }}
                  <template v-slot:input>
                    <v-select
                      slot="input"
                      :items="timeSelect"
                      v-model="day._time"
                      v-on:change="day.time = day._time"
                      label="Редактировать"
                    ></v-select>
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
              <td align="center">{{ getCountWorkDay(props.item.timesheet.plan[0].days) }}</td>
            </tr>
            <tr>
              <td align="center">{{ getCountWorkTime(props.item.timesheet.plan[0].days) }}</td>
            </tr>
            <tr>
              <td align="center">{{ getCountWorkDay(props.item.timesheet.actual[0].days) }}</td>
            </tr>
            <tr>
              <td align="center">{{ getCountWorkTime(props.item.timesheet.actual[0].days) }}</td>
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
      ],
      statusSelect: [
        { text: 'Явка', value: 'Я' },
        { text: 'Командировка', value: 'К' },
        { text: 'Отпуск', value: 'О' },
        { text: 'Прогул', value: 'П' },
        { text: 'Выходной', value: 'В' }
      ],
      timeSelect: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    }
  },
  computed: {
    getSelectSubdivisionWorkerGroup () {
      return this.workersList
    }
  },
  methods: {
    getCountWorkDay (days) {
      let filterDays = days.filter(item => item.status === 'Я')
      return filterDays.length
    },
    getCountWorkTime (days) {
      let filterDays = days.filter(item => item.time !== null)
      let countTime = 0
      for (let i = 0; i < filterDays.length; i++) {
        countTime = countTime + Number.parseInt(filterDays[i].time)
      }
      return countTime
    }
  }
}
</script>

<style scoped>

</style>
