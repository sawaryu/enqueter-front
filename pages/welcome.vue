<template>
  <v-container class="d-flex justify-center">
    <v-card class="pt-12 mt-12 text-center" flat color="rgb(0, 0, 0, 0)">
      <v-card-title class="text-h3 font-weight-bold text-center">
        Enqueter
      </v-card-title>
      <v-card-text>choise the majority.</v-card-text>
      <v-card-actions class="d-felx justify-center">
        <v-btn
          x-large
          color="grey darken-2"
          dark
          @click="$accessor.dialog.setSignupDialog(true)"
          >start</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  created() {
    // console.log(this.$vuetify.breakpoint.width)
  },
};
</script>