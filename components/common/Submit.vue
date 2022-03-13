<template>
  <v-btn v-if="disabled" light disabled rounded style="color: white">
    <slot>submit</slot>
  </v-btn>
  <v-btn
    v-else
    tabindex="1"
    dark
    rounded
    color="grey darken-2 white--text"
    style="color: white"
    @click="$emit('click')"
  >
    <slot>submit</slot>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>