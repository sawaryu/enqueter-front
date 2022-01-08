<template>
  <v-row class="justify-center">
    <v-col cols="12">
      {{ questionData }}
    </v-col>
    <v-col cols="12">
      <v-card flat color="rgb(0, 0, 0, 0)">
        <v-card-text>
          <v-row justify="center">
            <!-- Line data -->
            <v-col cols="12" sm="4" order="second" order-sm="first">
              <v-card :height="pieHeight">
                <v-card-title
                  >Total
                  <v-spacer></v-spacer>
                  (41 people answered)
                </v-card-title>
                <LineChart />
              </v-card>
            </v-col>

            <!-- Pie data -->
            <v-col cols="12" sm="4" order="first" order-sm="second">
              <div ref="pie">
                <v-card>
                  <v-card-title>
                    Ratio
                    <v-spacer></v-spacer>
                    (dominance of&nbsp;<span style="color: #bbdefb">No</span>)
                  </v-card-title>
                  <PieChart :pie_chart="questionData.pie_chart" />
                </v-card>
              </div>
            </v-col>

            <!-- Answered Users -->
            <v-col cols="12" sm="4">
              <v-card :height="pieHeight">
                <v-card-title>Answered Users</v-card-title>
                <v-divider></v-divider>
                <v-list
                  class="overflow-y-auto"
                  :style="{ height: pieHeight / 1.18 + 'px' }"
                >
                  <v-list-item
                    v-for="user in questionData.users"
                    :key="user.id"
                  >
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
interface QuestionData {
  line_chart_data: {};
  pie_chart_data: {};
  users: [];
}
export default Vue.extend({
  data() {
    return {
      questionData: {
        line_chart_data: { yes: 0, no: 0 },
        pie_chart_data: {}, // todo
        users: [],
      } as QuestionData,
      pieHeight: 0 as number,
    };
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
        console.log(res);
        this.questionData = res;
      } catch (error) {}
    },
  },
  mounted() {
    const dom = this.$refs.pie;
    const rect = dom.getBoundingClientRect();
    this.pieHeight = rect.height;
  },
});
</script>

<style>
</style>