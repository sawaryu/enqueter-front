<template>
  <v-app id="inspire">
    <v-overlay :value="loading" color="#FFFFFF" opacity="1" z-index="9999">
      <VueLoading
        type="bars"
        color="#333"
        :size="{ width: '60px', height: '60px' }"
      />
    </v-overlay>

    <!-- Error -->
    <v-app-bar v-if="$accessor.error.getIsError" app color="grey darken-3" dark>
      <v-toolbar-title class="text-h5 font-weight-bold"
        >Enqueter</v-toolbar-title
      >
    </v-app-bar>

    <!-- Welcome -->
    <v-app-bar v-else-if="isWelcome" color="rgb(0, 0, 0, 0)" app flat>
      <v-toolbar-title class="font-weight-bold">Enqueter</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        :large="isLarge"
        rounded
        class="mr-3"
        color="grey darken-2"
        outlined
        @click="$accessor.dialog.setLoginDialog(true)"
        >Login</v-btn
      >
      <v-btn
        elevation="0"
        :large="isLarge"
        rounded
        color="grey darken-2"
        dark
        @click="$accessor.dialog.setSignupDialog(true)"
        >SignUp</v-btn
      >
    </v-app-bar>

    <!-- LoggedIn -->
    <v-app-bar v-else app color="grey darken-3" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        @click="$router.push('/')"
        class="font-weight-bold pointer"
        >Enqueter</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <SearchXs v-if="$vuetify.breakpoint.name === 'xs'" />
      <Search v-else />
      <Notification />
    </v-app-bar>

    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      fixed
      temporary
      dark
      color="grey darken-3"
    >
      <Drawer @logout="drawer = null" />
    </v-navigation-drawer>

    <v-main :class="{ 'grey lighten-3': !isWelcome }">
      <v-container>
        <Overlay />
        <Report />
        <Flash />
        <Nuxt />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import { VueLoading } from "vue-loading-template";
import Vue from "vue";
export default Vue.extend({
  name: "default",
  components: { VueLoading },
  data() {
    return {
      loading: true as boolean,
      drawer: null as null | boolean,
    };
  },
  mounted(): void {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  computed: {
    isWelcome(): boolean {
      return this.$route.path.includes("/welcome");
    },
    isLarge(): boolean {
      return ["md", "lg", "xl"].includes(this.$vuetify.breakpoint.name);
    },
  },
});
</script>

<style>
</style>