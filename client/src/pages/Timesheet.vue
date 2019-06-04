<template>
  <layout-main>
    <v-toolbar flat color="transparent" class="mb-2">
      <v-toolbar-title>Список табелей</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchTimeshhet"
        append-icon="search"
        label="Поиск табеля"
        single-line
      ></v-text-field>
      <v-dialog v-model="dialogSaveTimesheet" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn dark color="primary" class="ml-5" v-on="on">Добавить<v-icon right dark>add</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn dark flat @click="onClickCloseDialogTimeshhet">
              <v-icon>clear</v-icon>
              Отмена
            </v-btn>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-select
                v-model="selectedItemSubdivisionList"
                :items="getSubdivisionList"
                item-text="name"
                label="Подразделение"
                prepend-icon="work"
                @change="onChangeSubdivisionSelect"
              ></v-select>
            </v-flex>
            <v-flex xs3 class="ml-2">
              <v-menu v-model="menuSetTimesheetDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="setTimesheetDate"
                    label="Дата"
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="setTimesheetDate"
                               no-title
                               @input="menuSetTimesheetDate = false"
                               type="month"
                               locale="ru"
                               ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn dark flat @click="onClickSaveDialogTimeshhet">{{ statusDialog === 'create' ? 'Добавить' : 'Сохранить' }}</v-btn>
          </v-toolbar>
          <v-card-text class="timesheet">
            <v-container grid-list-xl fluid fill-height>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-data-table
                    v-if="selectedItemSubdivisionList !== null"
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
                              <th v-for="(item, index) in props.item.timesheet.plan.days" v-bind:key="index" align="center">
                                {{ item.number }}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td v-for="(item, index) in props.item.timesheet.plan.days" v-bind:key="index" align="center">
                                <v-edit-dialog
                                  :return-value.sync="item.value"
                                  @save="onSaveTimeshhetPlanStatus"
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
                              <td v-for="(item, index) in props.item.timesheet.plan.days" v-bind:key="index" align="center">
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
                              <td v-for="(item, index) in props.item.timesheet.actual.days" v-bind:key="index" align="center">
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
                              <td v-for="(day, index) in props.item.timesheet.actual.days" v-bind:key="index" align="center">
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
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headersTableTimesheet"
      :items="getTimesheetList"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.worker }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="onClickEditTimesheet(props.item)">edit</v-icon>
          <v-icon small @click="onClickRemoveTimesheet(props.item.id)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
  </layout-main>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutMain from '../layouts/Main.vue'
export default {
  name: 'PageTimesheet',
  components: {
    LayoutMain: LayoutMain
  },
  data () {
    return {
      headersTableTimesheet: [
        { text: 'Наименование', value: 'name' },
        { text: 'Подразделение', value: 'subvision' },
        { text: 'Действия', value: 'actions', align: 'center', sortable: false }
      ],
      headers: [
        { text: '№пп', value: 'id' },
        { text: 'Сотрудник/должность', value: 'worker' },
        { text: 'Индентификатор', value: 'name', align: 'center', sortable: false },
        { text: 'Табель', value: 'type', align: 'center', sortable: false },
        { text: 'День/Часы', value: 'days', align: 'center', sortable: false },
        { text: 'Итого', value: 'total', align: 'center, sortable: false' }
      ],
      searchTimeshhet: null,
      dialogSaveTimesheet: false,
      dialogSaveTimesheetDay: false,
      timesheet: {
        name: null,
        subvision: null
      },
      subdivisionWorkerGroup: [],
      statusTimesheetDayList: ['Рабочий', 'Выходной', 'Отпуск', 'Командировка', 'Больничный', 'Прогул'],
      statusDialog: 'create',
      statusTimesheetDay: null,
      selectedItemSubdivisionList: null,
      menuSetTimesheetDate: false,
      setTimesheetDate: new Date().toISOString().substr(0, 7),
      setTimesheetDaysCount: []
    }
  },
  computed: {
    ...mapGetters({
      getterSelectSubdivisionWorkerGroup: 'Worker/getSelectSubdivisionWorkerGroup'
    }),
    getTimesheetList () {
      return this.$store.state.Timesheet.list
    },
    getWorkersList () {
      return this.$store.state.Worker.list
    },
    getSubdivisionList () {
      return this.$store.state.Subdivision.list
    },
    getSelectSubdivisionWorkerGroup () {
      return this.subdivisionWorkerGroup
    }
  },
  methods: {
    onClickCloseDialogTimeshhet () {
      this.dialogSaveTimesheet = false
    },
    onClickSaveDialogTimeshhet () {
      let workerList = this.subdivisionWorkerGroup
      this.$store.dispatch('Worker/update', workerList)
      // let timesheet = this.timesheet
      // switch (this.statusDialog) {
      //   case 'create':
      //     this.$store.dispatch('Timesheet/create', {
      //       name: timesheet.name,
      //       subvision: timesheet.subvision
      //     }).then(() => {
      //       this.dialogSaveTimesheet = false
      //     })
      //     this.$store.dispatch('Timesheet/update', workerList)
      //     break
      //   case 'edit':
      //     this.$store.dispatch('Timesheet/edit', {
      //       id: timesheet.id,
      //       data: {
      //         name: timesheet.name,
      //         subvision: timesheet.subvision
      //       }
      //     }).then(() => {
      //       this.dialogSaveTimesheet = false
      //     })
      //     break
      // }
    },
    onChangeSubdivisionSelect () {
      this.$store.dispatch('Worker/listTimesheet', this.setTimesheetDate)
        .then(() => {
          this.subdivisionWorkerGroup = [].concat(this.getterSelectSubdivisionWorkerGroup(this.selectedItemSubdivisionList, this.setTimesheetDate))
        })
    },
    onSaveTimeshhetPlanStatus () {
      this.$store.dispatch('Worker/listTimesheetUpdate', this.subdivisionWorkerGroup)
    }
  }
}
</script>

<style lang="scss">
  .v-toolbar {
    &--calendar &__content {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .timesheet {
    table {
      &.v-table {
        tbody {
          td {
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        thead {
          th {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>
