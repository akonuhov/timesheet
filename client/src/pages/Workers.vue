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
          <v-btn dark color="primary" class="ml-5" v-on="on" @click="onClickCreateDialogWorker">
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
                  <v-select v-model="worker.subdivision_number" :items="getSubdivisionsList" item-text="name" label="Подразделение"></v-select>
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
            <v-btn color="blue darken-1" flat @click="onClickSaveDialogWorker">{{ statusDialog === 'create' ? 'Добавить' : 'Сохранить' }}</v-btn>
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
        <td>{{ props.item.full_name }}</td>
        <td>{{ props.item.in }}</td>
        <td>{{ props.item.subdivision_number }}</td>
        <td>{{ props.item.position }}</td>
        <td>{{ props.item.timesheet }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="onClickEditWorker(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="onClickRemoveWorker(props.item.id)"
          >
            delete
          </v-icon>
        </td>
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
      { text: 'Рабочий табель', value: 'timesheet' },
      { text: 'Действия', value: 'actions', align: 'center', sortable: false }
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
    editWorkerId: null,
    dialogSaveWorker: false,
    selectSubdivisionList: null,
    statusDialog: 'create'
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
    onClickCreateDialogWorker () {
      for (let key in this.worker) {
        this.worker[key] = null
      }
    },
    onClickCloseDialogWorker () {
      this.dialogSaveWorker = false
    },
    onClickSaveDialogWorker () {
      let worker = this.worker
      switch (this.statusDialog) {
        case 'create':
          this.$store.dispatch('Worker/create', {
            in: worker.in,
            subdivision_number: worker.subdivision_number,
            full_name: worker.full_name,
            position: worker.position,
            timesheet: worker.timesheet
          }).then(() => {
            this.dialogSaveWorker = false
          })
          break
        case 'edit':
          this.$store.dispatch('Worker/edit', {
            id: worker.id,
            data: {
              in: worker.in,
              subdivision_number: worker.subdivision_number,
              full_name: worker.full_name,
              position: worker.position,
              timesheet: worker.timesheet
            }
          }).then(() => {
            this.dialogSaveWorker = false
          })
          break
      }
    },
    onClickEditWorker (item) {
      this.dialogSaveWorker = true
      this.statusDialog = 'edit'
      this.worker = Object.assign(this.worker, item)
    },
    onClickRemoveWorker (id) {
      confirm('Вы точно хотите удалить этого сотрудника?') && this.$store.dispatch('Worker/remove', id)
    }
  }
}
</script>

<style scoped>

</style>
