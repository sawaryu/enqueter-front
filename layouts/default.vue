<template>
  <v-app id="inspire">
    <!-- header -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <!-- drawer -->
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list class="pa-0">
        <v-list-item>
          <v-list-item-avatar size="60">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              sample123
            </v-list-item-title>
            <v-list-item-subtitle>sample</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <!-- main -->
    <v-main class="grey lighten-2">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- footer?? -->
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      drawer: null,
    };
  },
});
</script>

<style>
</style>