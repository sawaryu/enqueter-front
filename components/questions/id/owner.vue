<template>
  <v-row justify="center">
    <!-- Pie data -->
    <v-col class="mt-0 pt-0" cols="12" sm="4">
      <v-card width="450" color="rgb(0, 0, 0, 0)" flat>
        <v-card-title class="justify-center mt-0 pt-1">
          <v-icon>mdi-circle-slice-1</v-icon>Ratio
        </v-card-title>
        <v-divider></v-divider>
        <PieChart v-if="!loading && isRatio" :ratio="ratio" />
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
              <div v-if="user.is_yes" class="red--text">Yes</div>
              <div v-else class="blue--text">No</div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider v-if="users.length"></v-divider>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import PieChart from "~/chart/PieChart";
export default Vue.extend({
  components: {
    PieChart,
  },
  data() {
    return {
      loading: true,
      users: [],
      ratio: [0, 0],
    };
  },
  computed: {
    isRatio() {
      return this.ratio[0] || this.ratio[1];
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
        this.ratio = res.pie_chart_data;
        console.log(res.pie_chart_data);
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