<template>
  <v-card min-width="300px" max-width="700px" rounded="xl">
    <v-card-title class="font-weight-bold">
      <!-- closed -->
      <div v-if="!question.is_open" class="text-caption text--secondary">
        <span> <v-icon>mdi-close-octagon-outline</v-icon>closed</span>
      </div>

      <!-- is_answered -->
      <template v-if="question.user_id !== this.$auth.user.id">
        <span
          v-if="question.is_answered"
          class="text-caption text--secondary ml-2"
          ><v-icon>mdi-checkbox-marked-circle</v-icon>answered</span
        >
        <span
          v-else-if="question.is_open"
          class="text-caption ml-2 success--text"
          ><v-icon color="success">mdi-checkbox-marked-circle-outline</v-icon
          >answerable</span
        >
      </template>

      <v-spacer></v-spacer>

      <!-- owner chip -->
      <v-chip
        small
        class="text-caption"
        v-if="$auth.user.id === question.user_id"
        >your</v-chip
      >

      <!-- bookmark -->
      <v-btn icon @click="bookmark">
        <v-icon
          v-text="
            question.is_bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'
          "
        ></v-icon>
      </v-btn>

      <!-- menu -->
      <v-menu v-if="question.user_id !== $auth.user.id" offset-y>
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
        </v-list>
      </v-menu>

      <!-- slot -->
      <slot> </slot>
    </v-card-title>

    <v-card-title
      class="pt-0 pb-2 pointer"
      style="white-space: pre-wrap"
      @click="$router.push(`/questions/${question.id}`)"
      ><span class="question-title">{{ question.content }}</span></v-card-title
    >
    <v-card-actions>
      <v-avatar
        class="pointer"
        size="40"
        @click="$router.push(`/users/${question.user.id}`)"
      >
        <v-img :src="$avatar(question.user.avatar)"></v-img
      ></v-avatar>
      <div class="pl-1">
        <div class="text-caption">
          <span
            class="font-weight-medium underline pointer"
            @click="$router.push(`/users/${question.user.id}`)"
            v-text="question.user.username"
          ></span>
        </div>
        <div
          class="text-caption text--secondary"
          v-text="question.user.nickname"
        ></div>
      </div>
      <v-spacer></v-spacer>

      <!-- before time -->
      <div class="text--secondary text-caption">{{ beforeTime }}</div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import moment from "moment";
import { Question } from "@/common/entity/Question";
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    question: { type: Object, default: null } as PropOptions<Question>,
    isVuex: { type: Boolean, default: false },
  },
  computed: {
    beforeTime(): string {
      if (!this.question.is_open) {
        return "";
      }
      moment.locale("en");
      return "closed " + moment.unix(this.question.closed_at).fromNow();
    },
  },
  methods: {
    async bookmark() {
      if (this.question.is_bookmarked) {
        try {
          const res = await this.$axios.$delete("/questions/bookmark", {
            data: {
              question_id: this.question.id,
            },
          });
          if (this.isVuex) {
            this.$accessor.questions.bookmarkQuestion(this.question.id, false);
          } else {
            this.question.is_bookmarked = false;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await this.$axios.$post("/questions/bookmark", {
            question_id: this.question.id,
          });
          if (this.isVuex) {
            this.$accessor.questions.bookmarkQuestion(this.question.id, true);
          } else {
            this.question.is_bookmarked = true;
          }
        } catch (error) {
          console.log(error);
        }
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