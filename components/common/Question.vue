<template>
  <v-card max-width="500px">
    <v-card-title class="font-weight-bold">
      <v-icon color="black" size="40">mdi-file-question</v-icon>
      Question
      <!-- <span class="text-caption ml-2 success--text"
        ><v-icon color="success">mdi-check</v-icon>open</span
      > -->
      <span class="text-caption text--secondary ml-2"><v-icon>mdi-close-octagon-outline</v-icon>closed</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="isBookmark = !isBookmark">
        <v-icon>{{ bookmarkIcon }}</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title
              ><v-icon>mdi-flag</v-icon> report</v-list-item-title
            >
          </v-list-item>
          <v-list-item link>
            <v-list-item-title
              ><v-icon>mdi-delete</v-icon> delete</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-title
      class="pt-0 pointer"
      @click="$router.push(`/questions/${question.id}`)"
      ><span class="question-title">{{ question.title }}?</span></v-card-title
    >
    <v-card-actions>
      <v-avatar class="pointer" size="40">
        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img
      ></v-avatar>
      <div class="pl-1 underline pointer">
        <div class="text-caption">
          <span class="font-weight-medium"> sample123 </span>
        </div>
        <div class="text-caption text--secondary">aiueo</div>
      </div>
      <v-spacer></v-spacer>
      <div class="text-caption">
        <v-icon>mdi-clipboard-text-clock</v-icon>6 days to close.
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
interface Question {
  id: number;
  title: string;
}
export default Vue.extend({
  props: {
    question: { type: Object, default: null } as PropOptions<Question>,
  },
  data() {
    return {
      isBookmark: false,
    };
  },
  computed: {
    bookmarkIcon() {
      if (this.isBookmark) {
        return "mdi-bookmark";
      } else {
        return "mdi-bookmark-outline";
      }
    },
  },
});
</script>

<style scoped>
.question-title {
  position: relative;
  display: inline-block;
  text-decoration: none;
}
.question-title::after {
  position: absolute;
  bottom: -8px;
  left: 0;
  content: "";
  width: 100%;
  height: 2px;
  background: #333;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s;
}
.question-title:hover::after {
  bottom: -4px;
  opacity: 1;
  visibility: visible;
}
</style>