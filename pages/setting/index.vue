<template>
  <v-form ref="form" lazy-validation>

    <v-text-field
      color="grey darken-3"
      label="user id"
      maxlength="15"
      counter="15"
    ></v-text-field>

    <v-text-field
      color="grey darken-3"
      label="nickname"
      maxlength="20"
      counter="20"
    ></v-text-field>

    <v-textarea
      label="introduce"
      color="grey darken-3"
      placeholder="Hi, my name is john."
      maxlength="140"
      counter="140"
      dense
      class="my-4"
      light
    ></v-textarea>

    <v-btn
      >change</v-btn
    >
  </v-form>
</template>

<script>
export default {};
</script>

<style>
</style>