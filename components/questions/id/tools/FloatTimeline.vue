<template>
  <v-fab-transition>
    <v-btn class="mb-10" large fixed bottom left dark fab @click="$router.push('/')">
      <v-icon dark>mdi-home</v-icon>
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