<template>
  <v-speed-dial
    v-model="fab"
    bottom
    left
    fixed
    direction="top"
    :transition="transition"
  >
    <template v-slot:activator>
      <v-btn class="mb-4" v-model="fab" dark fab large>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-chevron-left </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark @click="back('/')">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn fab dark @click="back('/questions')">
      <v-icon>mdi-file-question</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      fab: false,
      transition: "slide-y-reverse-transition",
    };
  },
  methods: {
    back(path: string) {
      this.$router.push(path);
      this.$emit("close");
    },
  },
});
</script>

<style>
</style>