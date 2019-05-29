<template>
  <v-app>
    <v-navigation-drawer app
                         disable-resize-watcher
                         disable-route-watcher
                         temporary
                         hide-overlay
                         v-model="drawer">
      <v-toolbar flat
                 dark
                 color="teal lighten-1">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-title class="title">Сводный табель</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile
          v-for="item in getMainMenuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app
               dark
               color="teal lighten-1">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Сводный табель</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">more_vert</v-icon>
          </template>
          <v-list>
            <v-list-tile @click="onClickLogout">
              <v-list-tile-title><v-icon>exit_to_app</v-icon> Выйти</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-btn>
    </v-toolbar>
    <v-content app>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import MainMenuItems from '../const/navigation-main.json'
export default {
  name: 'LayoutMain',
  data () {
    return {
      drawer: null
    }
  },
  computed: {
    getMainMenuItems () {
      return MainMenuItems
    }
  },
  methods: {
    onClickLogout () {
      this.$store.dispatch('Authorization/logout').then(() => {
        this.$router.push('/authorization')
      })
    }
  }
}
</script>

<style lang="sass">

</style>
