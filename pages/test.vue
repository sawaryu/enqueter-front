<template>
  <v-row justify="center">
    <v-col v-for="item in items" :key="item.id">
      <v-card width="300">
        <v-card-text> content{{ item.id }} </v-card-text>
        <v-card-actions>
          <v-btn @click="remove(item.id)">delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      items: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
      ] as Array<Object>,
    };
  },
  methods: {
    remove(id: number) {
      this.items = this.items.filter((item: { id: number }) => {
        return item.id != id;
      });
    },
  },
});
</script>

<style>
</style>