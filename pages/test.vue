<template>
  <v-card>
    <!-- TODO: 改行 -->
    <v-card-text
      style="white-space: pre-wrap"
      v-text="newLine(content)"
    ></v-card-text>

    <v-textarea dense v-model="content"> </v-textarea>
  </v-card>
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