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
            <v-btn color="blue darken-1" flat @click="onClickSaveDialogSubdivisions">Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="subdivisionsList"
      :search="searchSubdivisions"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ null }}</td>
        <td>{{ null }}</td>
        <td>{{ null }}</td>
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
      { text: 'Наименование', value: 'userId' },
      { text: 'Номер', value: 'username' },
      { text: 'Адрес', value: 'email' }
    ],
    subdivisionsList: [],
    subdivision: {
      name: null,
      code: null,
      address: null
    },
    searchSubdivisions: null,
    dialogSaveSubdivision: false
  }),
  methods: {
    onClickCloseDialogSubdivisions () {
      this.dialogSaveSubdivision = false
    },
    onClickSaveDialogSubdivisions () {

    }
  }
}
</script>

<style scoped>

</style>
