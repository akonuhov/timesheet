<template>
  <layout-main>
    <v-toolbar flat color="transparent" class="mb-2">
      <v-toolbar-title>Список подразделений</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchSubdivisions"
        append-icon="search"
        label="Поиск сотрудников"
        single-line
      ></v-text-field>
      <v-dialog v-model="dialogSaveSubdivision" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn dark color="primary" class="ml-5" v-on="on" @click="onClickCreateDialogSubdivision">
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
                  <v-text-field v-model="subdivision.name" label="Наименование"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subdivision.code" label="Код"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="subdivision.address" label="Адрес"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="onClickCloseDialogSubdivisions">Отмена</v-btn>
            <v-btn color="blue darken-1" flat @click="onClickSaveDialogSubdivisions">{{ statusDialog === 'create' ? 'Добавить' : 'Сохранить' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="getSubdivisionsList"
      :search="searchSubdivisions"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.code }}</td>
        <td>{{ props.item.address }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="onClickEditSubdivisions(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="onClickRemoveSubdivisions(props.item.id)"
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
  name: 'PageSubdivision',
  components: {
    LayoutMain: LayoutMain
  },
  data: () => ({
    headers: [
      { text: 'Наименование', value: 'name' },
      { text: 'Номер', value: 'code' },
      { text: 'Адрес', value: 'address' },
      { text: 'Действия', value: 'actions', align: 'center', sortable: false }
    ],
    subdivision: {
      name: null,
      code: null,
      address: null
    },
    searchSubdivisions: null,
    dialogSaveSubdivision: false,
    statusDialog: 'create'
  }),
  computed: {
    getSubdivisionsList () {
      return this.$store.state.Subdivision.list
    }
  },
  methods: {
    onClickCreateDialogSubdivision () {
      for (let key in this.subdivision) {
        this.subdivision[key] = null
      }
    },
    onClickCloseDialogSubdivisions () {
      this.dialogSaveSubdivision = false
    },
    onClickSaveDialogSubdivisions () {
      let subdivision = this.subdivision
      switch (this.statusDialog) {
        case 'create':
          this.$store.dispatch('Subdivision/create', {
            name: subdivision.name,
            code: subdivision.code,
            address: subdivision.address
          }).then(() => {
            this.dialogSaveSubdivision = false
          })
          break
        case 'edit':
          this.$store.dispatch('Subdivision/edit', {
            id: subdivision.id,
            data: {
              name: subdivision.name,
              code: subdivision.code,
              address: subdivision.address
            }
          }).then(() => {
            this.dialogSaveSubdivision = false
          })
          break
      }
    },
    onClickEditSubdivisions (item) {
      this.dialogSaveSubdivision = true
      this.statusDialog = 'edit'
      this.subdivision = Object.assign(this.subdivision, item)
    },
    onClickRemoveSubdivisions (id) {
      confirm('Вы точно хотите удалить это подраздление?') && this.$store.dispatch('Subdivision/remove', id)
    }
  }
}
</script>

<style scoped>

</style>
