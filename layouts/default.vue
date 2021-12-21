<template>
  <v-app id="inspire">
    <!-- start loading -->
    <v-overlay :value="loading" color="#F8F9FA" opacity="1" z-index="9999">
      <v-progress-circular
        color="black"
        size="100"
        width="10"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

    <!-- header -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Enqueter</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
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
      <v-list nav dense>
        <v-list-item-group active-class="black--text">
          <v-list-item nuxt to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>home</v-list-item-title>
          </v-list-item>
          <v-list-item nuxt to="/questions">
            <v-list-item-icon>
              <v-icon>mdi-file-question</v-icon>
            </v-list-item-icon>
            <v-list-item-title>questions</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>profile</v-list-item-title>
          </v-list-item>
          <v-divider class="my-4"></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
});
</script>

<style>
</style>