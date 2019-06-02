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
            <v-btn dark flat @click="onClickSaveDialogTimeshhet">{{ statusDialog === 'create' ? 'Добавить' : 'Сохранить' }}</v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container grid-list-xl fluid fill-height>
              <v-layout row wrap>
                <v-flex d-flex xs3>
                  <v-card height="100%">
                    <v-card-actions>
                      <v-toolbar flat color="transparent" class="v-toolbar--calendar">
                        <v-btn fab small color="primary" @click="onClickCalendarPrev">
                          <v-icon>keyboard_arrow_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title class="ml-0">{{ getCalendarTimesheetDate }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn fab small color="primary" @click="onClickCalendarNext">
                          <v-icon>keyboard_arrow_right</v-icon>
                        </v-btn>
                      </v-toolbar>
                    </v-card-actions>
                    <v-card-text>
                      <v-form>
                        <v-text-field v-model="timesheet.name" label="Наименование"></v-text-field>
                        <v-select
                          v-model="timesheet.worker"
                          :items="getWorkersList"
                          item-text="full_name"
                          label="Сотрудник"
                        ></v-select>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs9>
                  <v-layout row wrap>
                    <v-flex d-flex xs12>
                      <v-sheet height="50%">
                        <h2 class="title mb-4">Плановый табель</h2>
                        <v-calendar
                          ref="calendarTimesheetPlanned"
                          v-model="timesheetPlanned"
                          :type="calendarTypeTimesheet"
                          locale="ru"
                          color="primary"
                          @click:day="onClickTimesheetDay"
                        >
                          <template v-slot:day="{ date }">
                            <template v-for="day in getTimesheetListDay[date]">
                              {{ day.status }}
                            </template>
                          </template>
                        </v-calendar>
                      </v-sheet>
                    </v-flex>
                    <v-flex d-flex xs12>
                      <v-sheet height="50%">
                        <h2 class="title mb-4">Фактический табель</h2>
                        <v-calendar
                          ref="calendarTimesheetActual"
                          v-model="timesheetActual"
                          :type="calendarTypeTimesheet"
                          locale="ru"
                          color="primary"
                        ></v-calendar>
                      </v-sheet>
                    </v-flex>
                    <v-dialog v-model="dialogSaveTimesheetDay" max-width="350">
                      <v-card>
                        <v-card-title class="headline">Добавть статус</v-card-title>
                        <v-card-text>
                          <v-form>
                            <v-select
                              :items="statusTimesheetDayList"
                              v-model="statusTimesheetDay"
                              label="Статус дня"
                            ></v-select>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat="flat" @click="onClickDialogCancelTimesheetDay">Отмена</v-btn>
                          <v-btn color="green darken-1" flat="flat"  @click="onClickDialogSaveTimeSheetDay">Добавить</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
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
import LayoutMain from '../layouts/Main.vue'
export default {
  name: 'PageTimesheet',
  components: {
    LayoutMain: LayoutMain
  },
  data: () => ({
    headers: [
      { text: 'Наименование', value: 'name' },
      { text: 'ФИО сотрудника', value: 'worker' },
      { text: 'Действия', value: 'actions', align: 'center', sortable: false }
    ],
    searchTimeshhet: null,
    dialogSaveTimesheet: false,
    dialogSaveTimesheetDay: false,
    calendarTypeTimesheet: 'month',
    timesheet: {
      name: null,
      worker: null,
      planned: [],
      actual: []
    },
    statusTimesheetDayList: ['Рабочий', 'Выходной', 'Отпуск', 'Командировка', 'Больничный', 'Прогул'],
    statusDialog: 'create',
    timesheetPlanned: new Date().toJSON(),
    timesheetActual: new Date().toJSON(),
    clickTimesheetDay: null,
    statusTimesheetDay: null
  }),
  computed: {
    getTimesheetList () {
      return this.$store.state.Timesheet.list
    },
    getCalendarTimesheetDate () {
      return this.moment(this.timesheetPlanned).format('D MMMM YYYY')
    },
    getWorkersList () {
      return this.$store.state.Worker.list
    },
    getTimesheetListDay () {
      return []
    }
  },
  methods: {
    onClickCloseDialogTimeshhet () {
      this.dialogSaveTimesheet = false
    },
    onClickSaveDialogTimeshhet () {
      let timesheet = this.timesheet
      switch (this.statusDialog) {
        case 'create':
          this.$store.dispatch('Timesheet/create', {
            name: timesheet.name,
            worker: timesheet.worker,
            planned: timesheet.planned,
            actual: timesheet.actual
          }).then(() => {
            this.dialogSaveTimesheet = false
          })
          break
        case 'edit':
          this.$store.dispatch('Timesheet/edit', {
            id: timesheet.id,
            data: {
              name: timesheet.name,
              worker: timesheet.worker,
              planned: timesheet.planned,
              actual: timesheet.actual
            }
          }).then(() => {
            this.dialogSaveTimesheet = false
          })
          break
      }
    },
    onClickTimesheetDay (day) {
      this.dialogSaveTimesheetDay = true
      this.clickTimesheetDay = day
    },
    onClickEditTimesheet (item) {
      this.dialogSaveTimesheet = true
      this.statusDialog = 'edit'
      this.timesheet = Object.assign(this.timesheet, item)
    },
    onClickRemoveTimesheet (id) {
      confirm('Вы точно хотите удалить это подраздление?') && this.$store.dispatch('Timesheet/remove', id)
    },
    onClickCalendarNext () {
      this.$refs.calendarTimesheetPlanned.next()
      this.$refs.calendarTimesheetActual.next()
    },
    onClickCalendarPrev () {
      this.$refs.calendarTimesheetPlanned.prev()
      this.$refs.calendarTimesheetActual.prev()
    },
    onClickDialogCancelTimesheetDay () {
      this.dialogSaveTimesheetDay = false
    },
    onClickDialogSaveTimeSheetDay () {
      this.timesheet.planned.push({
        date: this.clickTimesheetDay.date,
        status: this.statusTimesheetDay
      })
      this.dialogSaveTimesheetDay = false
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
</style>
