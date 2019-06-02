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
          <v-btn dark color="primary" class="ml-5" v-on="on">
            Добавить
            <v-icon right dark>add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn dark flat @click="onClickCloseDialogTimeshhet">
              <v-icon>clear</v-icon>
              Отмена
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn dark flat @click="onClickSaveDialogTimeshhet">Добавить</v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container grid-list-xl fluid>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-card height="100%">
                    <v-card-actions>
                      <v-toolbar flat color="transparent" class="v-toolbar--calendar">
                        <v-btn fab small color="primary" @click="$refs.calendarTimesheet.prev()">
                          <v-icon>keyboard_arrow_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title class="ml-0">{{ getCalendarTimesheetDate }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn fab small color="primary" @click="$refs.calendarTimesheet.next()">
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
                <v-flex xs9>
                  <v-sheet height="500">
                    <v-calendar
                      ref="calendarTimesheet"
                      v-model="calendarTimesheet"
                      :type="calendarTypeTimesheet"
                      locale="ru"
                      color="primary"
                    ></v-calendar>
                  </v-sheet>
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
        <td>{{ null }}</td>
        <td class="text-xs-right">{{ null }}</td>
        <td class="text-xs-right">{{ null }}</td>
        <td class="text-xs-right">{{ null }}</td>
        <td class="text-xs-right">{{ null }}</td>
        <td class="text-xs-right">{{ null }}</td>
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
      { text: 'Подразделение', value: 'subdivision' },
      { text: 'Номер подразделения', value: 'subdivision_number' },
      { text: 'Сотрудник', value: 'user' },
      { text: 'Должность', value: 'position' },
      { text: 'График работы', value: 'timesheet' },
      { text: 'ИД', value: 'id' }
    ],
    searchTimeshhet: null,
    dialogSaveTimesheet: false,
    calendarTimesheet: new Date().toJSON(),
    calendarTypeTimesheet: 'month',
    timesheet: {
      name: null,
      worker: null
    }
  }),
  computed: {
    getTimesheetList () {
      return []
    },
    getCalendarTimesheetDate () {
      return this.moment(this.calendarTimesheet).format('D MMMM YYYY')
    },
    getWorkersList () {
      return this.$store.state.Worker.list
    }
  },
  methods: {
    onClickCloseDialogTimeshhet () {
      this.dialogSaveTimesheet = false
    },
    onClickSaveDialogTimeshhet () {
      //
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
