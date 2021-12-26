<template>
  <v-form class="mb-15" ref="form" v-model="valid" lazy-validation>
    <!-- avatar -->
    <v-avatar size="110">
      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
    </v-avatar>

    <v-file-input
      ref="inputFile"
      counter
      show-size
      accept="image/png, image/jpeg, image/jpg"
      prepend-icon="mdi-camera"
      color="grey darken-3"
    ></v-file-input>

    <v-btn>change</v-btn>
  </v-form>
</template>

<script>
export default {};
</script>

<style>
</style>