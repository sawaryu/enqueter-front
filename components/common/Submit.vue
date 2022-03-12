<template>
  <v-btn
    :dark="!disabled"
    :light="disabled"
    :disabled="disabled"
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