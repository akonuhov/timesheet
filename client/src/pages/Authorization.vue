<template>
  <v-app>
    <v-content>
      <v-container fluid
                   fill-height>
        <v-layout align-center
                  justify-center>
          <v-flex xs8
                  sm6
                  md4>
            <v-card class="elevation-12">
              <v-toolbar dark
                         color="teal lighten-1">
                <v-toolbar-title>Авторизация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person"
                                v-model="login"
                                label="Логин"
                                type="text"></v-text-field>
                  <v-text-field prepend-icon="lock"
                                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                v-model="password"
                                label="Пароль"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="teal lighten-1">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'PageAuthorization',
  data: () => ({
    login: null,
    password: null,
    drawer: null,
    showPassword: false
  }),
  props: {
    source: String
  }
}
</script>

<style lang="sass">

</style>
