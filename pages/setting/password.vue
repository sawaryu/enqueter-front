<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      type="password"
      maxlength="72"
      counter="72"
      color="grey darken-3"
      label="current password"
      tabindex="1"
    >
    </v-text-field>
    <v-divider light class="my-4"></v-divider>
    <v-text-field
      type="password"
      maxlength="72"
      counter="72"
      color="grey darken-3"
      label="new password"
      tabindex="1"
    >
    </v-text-field>
    <v-text-field
      type="password"
      maxlength="72"
      counter="72"
      color="grey darken-3"
      label="new password (confirmation)"
      tabindex="1"
    >
    </v-text-field>
    <v-btn
      tabindex="1"
      >change</v-btn
    >
  </v-form>
</template>

<script>
export default {};
</script>

<style>
</style>