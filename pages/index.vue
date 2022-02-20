<template>
  <v-row>
    <v-col cols="12" md="4">
      <div style="position: sticky; top: 85px">
        <Ranking :users="users" @getRanking="getRanking" />
      </div>
    </v-col>

    <v-col cols="12" md="8" style="min-height: 80vh">
      <Timeline />
    </v-col>

    <FloatAnswer />
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async asyncData({ $axios, app }): Promise<any> {
    const url = `/users/${app.$accessor.ranking.getCurrentCategory}_ranking`;
    try {
      const res = await $axios.$get(url, {
        params: {
          period: app.$accessor.ranking.getCurrentPeriod,
        },
      });
      return { users: res };
    } catch (error) {}
  },
  data() {
    return {
      scrollY: 0,
    };
  },
  methods: {
    getRanking(res: any) {
      this.users = res;
    },
  },
  created() {
    this.$vuetify.goTo(this.$accessor.timeline.getScrollY);
  },
  destroyed() {
    this.$accessor.timeline.saveScroll(window.scrollY);
  },
});
</script>

<style>
</style>