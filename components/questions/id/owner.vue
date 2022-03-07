<template>
  <div>
    <div class="d-flex justify-center">
      <v-checkbox
        v-model="preview"
        hide-details
        color="black"
        label="Preview"
      ></v-checkbox>
    </div>

    <v-row v-if="!preview" justify="center">
      <!-- Ratio -->
      <v-card class="col-12 col-sm-6" width="450" color="rgb(0, 0, 0, 0)" flat>
        <v-card-title class="justify-center">
          <v-icon>mdi-circle-slice-1</v-icon>Ratio
        </v-card-title>
        <v-divider></v-divider>
        <div
          v-if="!loading && isExistCountData"
          class="mx-auto"
          :class="[
            $vuetify.breakpoint.name === 'xs' ? 'pie-size-xs' : 'pie-size',
          ]"
        >
          <PieChart :count_data="count_data" :options_data="options_data" />
        </div>
        <v-card-text class="text-center" v-else
          >Ratio is displayed here.
        </v-card-text>
      </v-card>

      <!-- Users -->
      <v-card class="col-12 col-sm-6" color="rgb(0, 0, 0, 0)" flat>
        <v-card-title class="justify-center"
          ><v-icon>mdi-account-multiple</v-icon>Users</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="text-center">
          <span v-if="!users.length"> Answered users is displayed here. </span>
          <span v-else>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            {{ users.length }} people answered
          </span>
        </v-card-text>
        <v-list height="290" color="rgb(0, 0, 0, 0)" class="overflow-y-auto">
          <v-list-item
            v-for="user in users"
            :key="user.id"
            :class="{ 'current-user': user.id === $auth.user.id }"
            @click="$router.push(`/users/${user.id}`)"
          >
            <v-list-item-avatar size="37">
              <v-img :src="$avatar(user.avatar)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span v-text="user.username"></span>
              </v-list-item-title>
              <v-list-item-subtitle
                v-text="user.nickname"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <div
                v-if="user.option === 'first'"
                class="red--text"
                v-text="question.option_first"
              ></div>
              <div
                v-else
                class="blue--text"
                v-text="question.option_second"
              ></div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider v-if="users.length"></v-divider>
      </v-card>
    </v-row>

    <Preview class="mt-4" v-else :question="question" />
  </div>
</template>

<script lang="ts">
import { User, Question } from "@/common/types/models";
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
      preview: false,
      users: [] as User[],
      count_data: [0, 0] as Number[],
    };
  },
  computed: {
    options_data(): String[] {
      // *reversed for chart.
      return [this.question.option_second, this.question.option_first];
    },
    isExistCountData(): Boolean {
      return this.count_data[0] > 0 || this.count_data[1] > 0;
    },
  },
  created() {
    this.getQuestionData();
  },
  methods: {
    async getQuestionData(): Promise<void> {
      try {
        const res = await this.$axios.$get(
          `/questions/${this.$route.params.id}/owner`
        );
        this.users = res.users;
        this.count_data = res.count_data.reverse();
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.pie-size {
  width: 300px;
  height: 300px;
}
.pie-size-xs {
  width: 230px;
  height: 230px;
}
.current-user {
  background-color: rgba(192, 192, 192, 0.25);
  border-radius: 1%;
}
</style>