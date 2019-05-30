<template>
  <layout-main>
    <v-toolbar flat color="transparent" class="mb-2">
      <v-toolbar-title>Список сотрудников</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchWorkers"
        append-icon="search"
        label="Поиск сотрудников"
        single-line
      ></v-text-field>
      <v-dialog v-model="dialogSaveWorker" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn dark color="primary" class="ml-5" v-on="on">
            Добавить
            <v-icon right dark>add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Добавить нового сотрудника</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout column>
                <v-flex>
                  <v-text-field v-model="worker.full_name" label="ФИО"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="worker.in" label="Идентификационный номер"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select v-model="worker.subdivision" :items="getSubdivisionsList" item-text="name" item-value="code" label="Подразделение"></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="worker.position" label="Должность"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="worker.timesheet" label="Рабочий табель"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="onClickCloseDialogWorker">Отмена</v-btn>
            <v-btn color="blue darken-1" flat @click="onClickSaveDialogWorker">Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="getWorkersList"
      :search="searchWorkers"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.in }}</td>
        <td>{{ props.item.subdivision_number }}</td>
        <td>{{ props.item.full_name }}</td>
        <td>{{ props.item.position }}</td>
        <td>{{ props.item.timesheet }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Ваш поиск для "{{ search }}" не найдено результатов.
        </v-alert>
      </template>
    </v-data-table>
  </layout-main>
</template>

<script>
import LayoutMain from '../layouts/Main.vue'
export default {
  name: 'PageWorkers',
  components: {
    LayoutMain: LayoutMain
  },
  data: () => ({
    headers: [
      { text: 'ФИО', value: 'full_name' },
      { text: 'Идентификационный номер', value: 'in' },
      { text: 'Подразделение', value: 'subdivision_number' },
      { text: 'Должность', value: 'position' },
      { text: 'Рабочий табель', value: 'timesheet' }
    ],
    workersList: [],
    worker: {
      in: null,
      subdivision_number: null,
      full_name: null,
      position: null,
      timesheet: null
    },
    searchWorkers: null,
    dialogSaveWorker: false,
    selectSubdivisionList: null
  }),
  computed: {
    getSubdivisionsList () {
      return this.$store.state.Subdivision.list
    },
    getWorkersList () {
      return this.$store.state.Worker.list
    }
  },
  methods: {
    onClickCloseDialogWorker () {
      this.dialogSaveWorker = false
    },
    onClickSaveDialogWorker () {
      let worker = this.worker
      this.$store.dispatch('Worker/create', {
        in: worker.in,
        subdivision: worker.subdivision,
        full_name: worker.full_name,
        position: worker.position,
        timesheet: worker.timesheet
      }).then(() => {
        this.dialogSaveWorker = false
      })
    }
  }
}
</script>

<style scoped>

</style>
