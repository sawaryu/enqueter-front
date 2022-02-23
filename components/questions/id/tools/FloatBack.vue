<template>
  <v-fab-transition>
    <v-btn
      class="mb-10"
      large
      bottom
      left
      fixed
      dark
      fab
      @click="$router.back()"
    >
      <v-icon dark>mdi-chevron-left</v-icon>
    </v-btn>
  </v-fab-transition>
</template>