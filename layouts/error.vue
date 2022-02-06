<template>
  <v-card
    class="d-flex justify-center align-center"
    elevation="0"
    width="100vw"
    height="80vh"
    color="rgb(0, 0, 0, 0)"
  >
    <div>
      <v-card-text class="text-h2 text-center font-weight-bold"
        >{{ error.statusCode }} error</v-card-text
      >
      <v-card-text class="text-h4 text-center">{{ error.message }}</v-card-text>

      <!-- <v-card-text class="text-center" v-if="error.statusCode != 503">
        <v-btn large dark color="grey darken-3" @click="goHome"
          >Back <v-icon right dark> mdi-home </v-icon></v-btn
        >
      </v-card-text> -->
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  created() { this.$accessor.error.setIsError(true)},
  destroyed() { this.$accessor.error.setIsError(false) },
  methods: {
    goHome(): void {
      if (this.$auth.loggedIn) {
        this.$router.push("/")
      } else {
        this.$router.push("/welcome")
      }
    }
  }
});
</script>



<style scoped>
</style>