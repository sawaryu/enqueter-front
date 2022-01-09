<template>
  <v-snackbar
    :value="snackbar"
    @input="$emit('close')"
    transition="slide-x-reverse-transition"
    class="mt-10"
    top
    :color="snackDisplay.color"
    timeout="5000"
    rounded="pill"
    height="8vh"
  >
    {{ snackDisplay.message }}
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    snackbar: {
      type: Boolean,
      required: true,
    },
    snackDisplay: {
      type: Object,
      required: true,
    },
  },
});
</script>