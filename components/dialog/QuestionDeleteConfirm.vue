<template>
  <v-dialog :value="deletion_id" @input="$emit('close')" max-width="400">
    <v-card rounded="lg" class="text-center pa-2">
      <v-card-title class="">
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-title class="justify-center pt-0 text-subtitle-1">
        Do you really want to delete?
      </v-card-title>
      <v-card-text class="text-caption"
        >* This operation cannot be undone.</v-card-text
      >
      <v-card-actions>
        <v-btn color="grey darken-3" text @click="$emit('close')"> cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" text dark @click="$emit('remove', deletion_id)">
          delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    deletion_id: {
      type: Number,
      required: true,
    } as PropOptions<number>,
  },
});
</script>