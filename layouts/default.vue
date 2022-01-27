<template>
  <v-app id="inspire">
    <!-- loading -->
    <v-overlay :value="loading" color="#F8F9FA" opacity="1" z-index="9999">
      <VueLoading
        type="bars"
        color="#333"
        :size="{ width: '80px', height: '80px' }"
      />
    </v-overlay>

    <!-- header welcome -->
    <v-app-bar
      v-if="$route.path.includes('/welcome')"
      color="rgb(0, 0, 0, 0)"
      app
      flat
    >
      <v-toolbar-title class="text-h5 font-weight-bold"
        >Enqueter</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <template v-if="!$accessor.error.getIsError">
        <v-btn
          :large="isLarge"
          class="mr-3"
          color="grey darken-2"
          outlined
          @click="$accessor.dialog.setLoginDialog(true)"
          >Login</v-btn
        >
        <v-btn
          :large="isLarge"
          color="grey darken-2"
          dark
          @click="$accessor.dialog.setSignupDialog(true)"
          >SignUp</v-btn
        >
      </template>
    </v-app-bar>

    <!-- header -->
    <v-app-bar v-else app color="grey darken-3" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        @click="$router.push('/')"
        class="font-weight-bold pointer"
        >Enqueter</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <template v-if="!$accessor.error.getIsError">
        <!-- Search -->
        <Search />
        <SearchXs />

        <!-- Notification -->
        <Notification />
      </template>
    </v-app-bar>

    <!-- drawer -->
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      fixed
      temporary
      dark
      color="grey darken-3"
    >
      <v-list class="pa-0">
        <v-list-item
          class="pointer"
          @click="$router.push(`/users/${$auth.user.id}`)"
        >
          <v-list-item-avatar size="60">
            <v-img :src="$avatar($auth.user.avatar)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-bold"
              v-text="$auth.user.username"
            >
            </v-list-item-title>
            <v-list-item-subtitle
              v-text="$auth.user.nickname"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item nuxt to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item nuxt to="/questions">
            <v-list-item-icon>
              <v-icon>mdi-file-question</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Questions</v-list-item-title>
          </v-list-item>
          <v-list-item nuxt :to="`/users/${$auth.user.id}`">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item nuxt to="/setting">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item>
          <v-divider class="my-4"></v-divider>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- main -->
    <v-main :class="{ 'grey lighten-3': !$route.path.includes('/welcome') }">
      <v-container>
        <Report />
        <Flash />
        <Overlay />
        <Nuxt />
      </v-container>
    </v-main>

    <!-- footer?? -->
  </v-app>
</template>

<script lang="ts">
import { VueLoading } from "vue-loading-template";
import Vue from "vue";
export default Vue.extend({
  components: {
    VueLoading,
  },
  name: "default",
  data() {
    return {
      loading: true,
      drawer: null as null | boolean,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.drawer = null;
      this.$accessor.flash.showMessage(
        {
          message: "Logged out completely.",
          type: "info",
          status: true,
        },
        { root: true }
      );
    },
  },
  computed: {
    isLarge() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    },
  },
});
</script>

<style>
</style>