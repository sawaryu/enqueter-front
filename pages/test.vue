<template>
  <v-row class="mt-10" justify="center">
    <v-col cols="1">
      <v-avatar size="75">
        <v-img :src="$avatar($auth.user.avatar)"></v-img>
      </v-avatar>
    </v-col>
    <v-col cols="3">
      <v-row class="d-flex justify-start">
        <div>
          <div class="text-h6 font-weight-bold">sample11</div>
          <div class="text--secondary text-caption">sampleuser</div>
        </div>
        <div class="ml-5"><v-btn>follow</v-btn></div>
        <div class="ml-2">
          <v-btn icon>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
      </v-row>

      <v-row class="my-4 d-flex justify-space-between">
        <v-btn class="mt-3" small plain :ripple="false">
          <div>
            <div
              class="text-subtitle-1 font-weight-black"
            >333</div>
            <small>questions</small>
          </div>
        </v-btn>
        <v-btn class="mt-3" small plain :ripple="false">
          <div>
            <div
              class="text-subtitle-1 font-weight-black"
            >422</div>
            <small>following</small>
          </div>
        </v-btn>
        <v-btn class="mt-3" small plain :ripple="false">
          <div>
            <div
              class="text-subtitle-1 font-weight-black"
            >11</div>
            <small>follower</small>
          </div>
        </v-btn>
      </v-row>

      <!-- <v-row>
        <div class="text--secondary">sampleuser</div>
      </v-row> -->

      <v-row>
        <div class="">
          Lorem, ipsum dolor sit nde veacilis <br />
          id similique mus iusto, aut illum consequuntur?
        </div>
      </v-row>
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