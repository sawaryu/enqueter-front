<template>
  <v-fab-transition>
    <v-btn class="mb-10" large fixed bottom right dark fab @click="back">
      <v-icon dark>mdi-chevron-right</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    back() {
      this.$router.back()
      this.$emit("close")
    },
  },
});
</script>