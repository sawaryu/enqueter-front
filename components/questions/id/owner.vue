<template>
  <v-row justify="center">
    <!-- Pie data -->
    <v-col class="mt-0 pt-0" cols="12" sm="4">
      <v-card width="450" color="rgb(0, 0, 0, 0)" flat>
        <v-card-title class="justify-center mt-0 pt-1">
          <v-icon>mdi-circle-slice-1</v-icon>Ratio
        </v-card-title>
        <v-divider></v-divider>
        <div
          v-if="!loading && isExistCountData"
          class="mx-auto"
          style="width: 300px; height: 300px"
        >
          <PieChart :count_data="count_data" :options_data="options_data" />
        </div>
        <v-card-text class="text-center" v-else
          >'Yes' and 'No' ratio is displayed here.
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Answered Users -->
    <v-col class="mt-0 pt-0" cols="12" sm="4">
      <v-card color="rgb(0, 0, 0, 0)" flat>
        <v-card-title class="justify-center mt-0 pt-1"
          ><v-icon>mdi-account-multiple</v-icon>{{ users.length }} people
          answered</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="text-center" v-if="!users.length">
          Answered users is displayed here.
        </v-card-text>
        <v-list
          v-else
          max-height="420"
          color="rgb(0, 0, 0, 0)"
          class="overflow-y-auto"
          :style="{ height: 420 / 1.18 + 'px' }"
        >
          <v-list-item v-for="user in users" :key="user.id">
            <v-list-item-avatar
              class="pointer"
              size="37"
              @click="$router.push(`/users/${user.id}`)"
            >
              <v-img :src="$avatar(user.avatar)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span
                  class="underline pointer"
                  v-text="user.username"
                  @click="$router.push(`/users/${user.id}`)"
                ></span>
              </v-list-item-title>
              <v-list-item-subtitle
                v-text="user.nickname"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <div v-if="user.option === 'first'" class="red--text">
                {{ question.option_first }}
              </div>
              <div v-else class="blue--text">{{ question.option_second }}</div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider v-if="users.length"></v-divider>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { User } from "@/common/entity/User";
import { Question } from "@/common/entity/Question";
import PieChart from "~/chart/PieChart";
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    question: {
      type: Object,
      required: true,
    } as PropOptions<Question>,
  },
  components: {
    PieChart,
  },
  data() {
    return {
      loading: true as boolean,
      users: [] as User[],
      count_data: [0, 0] as Number[],
    };
  },
  computed: {
    options_data(): String[] {
      return [this.question.option_first, this.question.option_second]
    },
    isExistCountData(): boolean {
      return this.count_data[0] || this.count_data[1];
    },
  },
  created() {
    this.getQuestionData();
  },
  methods: {
    async getQuestionData() {
      try {
        const res = await this.$axios.$get(
          `/questions/${this.$route.params.id}/owner`
        );
        this.users = res.users;
        this.count_data = res.count_data;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style>
</style>