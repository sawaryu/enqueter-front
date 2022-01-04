<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <v-card flat color="rgb(0, 0, 0, 0)">
        <v-card-text>
          <v-row justify="center">
            <!-- answered user -->
            <v-col cols="12" sm="4" order="second" order-sm="first">
              <v-card :height="pieHeight">
                <v-card-title
                  ><v-icon>mdi-account</v-icon> Users (10 users
                  answered)</v-card-title
                >
                <v-divider></v-divider>
                <v-list
                  class="overflow-y-auto"
                  :style="{ height: pieHeight / 1.18 + 'px' }"
                >
                  <v-list-item v-for="n in 10" :key="n">
                    <v-list-item-avatar class="pointer" size="37">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="underline pointer">sample123</span>
                      </v-list-item-title>
                      <v-list-item-subtitle>sample</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <!-- chart -->
            <v-col cols="12" sm="4" order="first" order-sm="second">
              <div ref="pie">
                <v-card>
                  <v-card-title><v-icon>mdi-poll</v-icon> Data </v-card-title>
                  <v-divider></v-divider>
                  <Pie />
                </v-card>
              </div>
            </v-col>

            <!-- other -->
            <v-col cols="12" sm="4">
              <v-card :height="pieHeight">
                <v-card-title>Other</v-card-title>
                <v-divider></v-divider>
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
  // the api only for the question owner.
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/questions/${params.id}/owner`);
    console.log(res);
    return { question: res };
  },
  data() {
    return {
      pieHeight: 0 as number,
    };
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