<template>
  <v-row class="justify-center">

    <v-col cols="12" class="mt-0 pt-0">
      <v-card class="mt-0 pt-0" flat color="rgb(0, 0, 0, 0)">
        <v-card-text>
          <v-row justify="center">
            <!-- Pie data -->
            <v-col cols="12" sm="4" order-sm="second">
              <v-card color="rgb(0, 0, 0, 0)" flat>
                <v-card-title class="justify-center">
                  <v-icon>mdi-circle-slice-1</v-icon>Ratio
                  <!-- (dominance of&nbsp;<span style="color: #bbdefb">No</span>) -->
                </v-card-title>
                <v-divider></v-divider>
                <PieChart
                  v-if="loaded && isPieData"
                  :chartData="pieChartData"
                />
                <v-card-text class="text-center" v-else
                  >The answered ratio is displayed here.
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Answered Users -->
            <v-col cols="12" sm="4">
              <v-card height="420" color="rgb(0, 0, 0, 0)" flat>
                <v-card-title class="justify-center"
                  ><v-icon>mdi-account-multiple</v-icon>{{ users.length }} users answered</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text class="text-center" v-if="!users.length">
                  Answered users is displayed here.
                </v-card-text>
                <v-list
                  v-else
                  color="rgb(0, 0, 0, 0)"
                  class="overflow-y-auto"
                  :style="{ height: 420 / 1.18 + 'px' }"
                >
                  <v-list-item v-for="user in users" :key="user.id">
                    <v-list-item-avatar class="pointer" size="37">
                      <v-img :src="$avatar(user.avatar)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <span
                          class="underline pointer"
                          v-text="user.public_id"
                        ></span>
                      </v-list-item-title>
                      <v-list-item-subtitle
                        v-text="user.name"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      // is loaded
      loaded: false,
      // users
      users: [],
      // pie chart data (* attention yes no order )
      pieChartData: {
        labels: ["No", "Yes"],
        datasets: [
          {
            backgroundColor: ["#BBDEFB", "#FFCDD2"],
            data: [0, 0],
          },
        ],
      },
    };
  },
  created() {
    this.getQuestionData();
  },
  computed: {
    isPieData() {
      const data = this.pieChartData.datasets[0].data;
      return data[0] || data[1];
    },
  },
  methods: {
    async getQuestionData() {
      try {
        const res = await this.$axios.$get(
          `/questions/${this.$route.params.id}/owner`
        );
        console.log(res);
        this.users = res.users;
        this.pieChartData.datasets[0].data = res.pie_chart_data;

        // important
        this.loaded = true;
      } catch (error) {}
    },
  },
});
</script>

<style>
</style>