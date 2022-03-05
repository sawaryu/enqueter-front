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
      <div v-if="error.statusCode !== 503" class="text-center">
        <v-btn
          @click="$router.replace('/')"
          large
          rounded
          color="grey darken-2"
          dark
        >
          <v-icon>mdi-home</v-icon>
          Home</v-btn
        >
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
type Error = {
  statusCode: number;
  message: string;
};
export default Vue.extend({
  props: {
    error: {
      type: Object,
      default: null,
    } as PropOptions<Error>,
  },
  created() {
    this.$accessor.error.setIsError(true);
  },
  destroyed() {
    this.$accessor.error.setIsError(false);
  },
});
</script>