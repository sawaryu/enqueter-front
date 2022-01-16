<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-row>
          <v-avatar></v-avatar>
        </v-row>

        <v-row>

        </v-row>

        <v-row>

        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      content: "",
    };
  },
  methods: {
    post() {
      //私は、textareaの改行コード \n を文字列\nに変換
      this.content.replace(/\n/g, "\\n"); //ajax //結果をcontentに返す
    },
    newLine(content: string) {
      return content.replace(/\\n/g, "\n");
    },
  },
});
</script>

<style>
</style>