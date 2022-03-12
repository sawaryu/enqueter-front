<template>
  <v-btn v-if="disabled" disabled rounded>
    <slot>submit</slot>
  </v-btn>
  <v-btn
    v-else
    tabindex="1"
    rounded
    color="grey darken-2 white--text"
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