<template>
  <v-card max-width="500px">
    <v-card-title class="font-weight-bold">
      <v-icon color="black" size="40">mdi-file-question</v-icon>
      Question

      <!-- is_open? -->
      <span v-if="question.is_open" class="text-caption ml-2 success--text"
        ><v-icon color="success">mdi-check</v-icon>open</span
      >
      <span v-else class="text-caption text--secondary ml-2"
        ><v-icon>mdi-close-octagon-outline</v-icon>closed</span
      >

      <!-- is_answered -->
      <span v-if="question.is_answered" class="text-caption ml-2 success--text"
        ><v-icon color="success">mdi-check</v-icon>answered</span
      >
      <span v-else class="text-caption text--secondary ml-2"
        ><v-icon>mdi-close-octagon-outline</v-icon>unanswered</span
      >
      <v-spacer></v-spacer>
      <v-btn icon @click="bookmark">
        <v-icon
          v-text="
            question.is_bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'
          "
        ></v-icon>
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
          <!-- TODO -->
          <!-- <v-list-item link>
            <v-list-item-title
              ><v-icon>mdi-delete</v-icon> delete</v-list-item-title
            >
          </v-list-item> -->
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-title
      class="pt-0 pointer"
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
            v-text="question.user.public_id"
          ></span>
        </div>
        <div
          class="text-caption text--secondary"
          v-text="question.user.name"
        ></div>
      </div>
      <v-spacer></v-spacer>
      <div class="text-caption text--secondary">
        {{ beforeTime }}
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import moment from "moment";
import Vue, { PropOptions } from "vue";
interface Question {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  is_open: boolean;
  is_answered: boolean;
  is_bookmarked: boolean;
  user: {
    id: number;
    public_id: string;
    name: string;
    introduce: string;
    avatar: string;
    point: number;
    created_at: string;
    updated_at: string;
    is_following: boolean;
    role: string;
  };
}
export default Vue.extend({
  props: {
    question: { type: Object, default: null } as PropOptions<Question>,
  },
  computed: {
    beforeTime(): string {
      moment.locale("en");
      return moment(this.question.created_at).fromNow();
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
          this.question.is_bookmarked = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await this.$axios.$post("/questions/bookmark", {
            question_id: this.question.id,
          });
          this.question.is_bookmarked = true;
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