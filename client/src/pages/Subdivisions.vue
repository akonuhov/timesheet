<template>
  <layout-main>
    <v-layout wrap>
      <v-flex class="mb-4">
        <h1 class="headline">Список подразделений</h1>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="subdivision"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ null }}</td>
            <td>{{ null }}</td>
            <td>{{ null }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
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
    subdivision: []
  })
}
</script>

<style scoped>

</style>
