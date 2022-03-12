<template>
  <v-btn
    v-if="disabled"
    light
    disabled
    tabindex="1"
    rounded
    color="grey darken-2"
  >
    <slot>submit</slot>
  </v-btn>
  <v-btn
    v-else
    dark
    tabindex="1"
    rounded
    color="grey darken-2"
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