<template>
  <v-snackbar
    class="mt-10"
    v-model="$accessor.flash.status"
    transition="slide-x-reverse-transition"
    right
    top
    :color="$accessor.flash.type"
  >
    {{ $accessor.flash.message }}

    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="$accessor.flash.setStatus(false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>