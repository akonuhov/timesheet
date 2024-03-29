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
          <v-btn dark color="primary" class="ml-5" v-on="on" @click="onClickCreateTimesheet">Добавить<v-icon right dark>add</v-icon></v-btn>
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
                :disabled="statusDialog === 'edit'"
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
                    :disabled="statusDialog === 'edit'"
                    label="Дата"
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="setTimesheetDate"
                               no-title
                               @input="onChangeTimesheetDateSelect"
                               type="month"
                               locale="ru"
                               ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn dark flat @click="onClickSaveTimesheet">{{ statusDialog === 'create' ? 'Добавить' : 'Сохранить' }}</v-btn>
          </v-toolbar>
          <v-card-text class="timesheet">
            <v-container grid-list-xl fluid fill-height>
              <v-layout row wrap>
                <timesheet v-if="selectedItemSubdivisionList !== null" :workersList="getSelectSubdivisionWorkerGroup"></timesheet>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headersTableTimesheet"
      :items="getTimesheetList"
      :rows-per-page-items="[25, 50, 75, 100]"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.subdivision }}</td>
        <td>{{ formatDateTimesheet(props.item.date) }}</td>
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
import Timesheet from '../components/timesheet'
export default {
  name: 'PageTimesheet',
  components: {
    LayoutMain,
    Timesheet
  },
  data () {
    return {
      headersTableTimesheet: [
        { text: 'Подразделение', value: 'subdivision' },
        { text: 'Дата', value: 'date' },
        { text: 'Действия', value: 'actions', align: 'center', sortable: false }
      ],
      searchTimeshhet: null,
      dialogSaveTimesheet: false,
      subdivisionWorkerGroup: [],
      statusDialog: 'create',
      menuSetTimesheetDate: false,
      setTimesheetDate: new Date().toISOString().substr(0, 7),
      selectedItemSubdivisionList: null,
      timesheetId: null
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
    onChangeSubdivisionSelect () {
      this.subdivisionWorkerGroup = this.getterSelectSubdivisionWorkerGroup(this.selectedItemSubdivisionList, this.setTimesheetDate)
    },
    onClickSaveTimesheet () {
      switch (this.statusDialog) {
        case 'create':
          this.$store.dispatch('Timesheet/create', {
            subdivision: this.selectedItemSubdivisionList,
            date: this.setTimesheetDate
          })
            .then(() => {
              this.dialogSaveTimesheet = false
            })
          break
        case 'edit':
          this.$store.dispatch('Timesheet/edit', {
            id: this.timesheetId,
            data: {
              subdivision: this.selectedItemSubdivisionList,
              date: this.setTimesheetDate
            }
          })
            .then(() => {
              this.dialogSaveTimesheet = false
            })
          break
      }
      this.$store.dispatch('Worker/update', this.subdivisionWorkerGroup)
    },
    onClickEditTimesheet (item) {
      this.dialogSaveTimesheet = true
      this.statusDialog = 'edit'
      this.timesheetId = item.id
      this.selectedItemSubdivisionList = item.subdivision
      this.setTimesheetDate = item.date
      this.subdivisionWorkerGroup = this.getterSelectSubdivisionWorkerGroup(this.selectedItemSubdivisionList, this.setTimesheetDate)
    },
    onClickRemoveTimesheet (id) {
      confirm('Вы точно хотите удалить этот табель?') && this.$store.dispatch('Timesheet/remove', id)
    },
    onClickCreateTimesheet () {
      this.statusDialog = 'create'
      this.selectedItemSubdivisionList = null
    },
    onChangeTimesheetDateSelect () {
      this.menuSetTimesheetDate = false
      this.subdivisionWorkerGroup = this.getterSelectSubdivisionWorkerGroup(this.selectedItemSubdivisionList, this.setTimesheetDate)
    },
    formatDateTimesheet (date) {
      return this.moment(date).format('MMMM YYYY')
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
