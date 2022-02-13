<template>
  <v-sheet color="rgb(0, 0, 0, 0)" flat>
    <v-card-title class="font-weight-light">
      <v-icon>mdi-crown</v-icon>Ranking</v-card-title
    >
    <v-subheader>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption text--secondary font-weight-light"
        >Regularly aggregated.</span
      >
      <v-spacer></v-spacer>
      <PeriodsBtn />
    </v-subheader>
    <v-divider></v-divider>

    <v-list color="rgb(0, 0, 0, 0)" dense height="50vh" class="overflow-y-auto">
      <VueLoading
        v-if="loading"
        type="bars"
        color="#333"
        :size="{ width: '30px', height: '30px' }"
      />

      <v-list-item v-else v-for="(user, index) in users" :key="user.id">
        <div v-text="ordinal(index + 1)"></div>
        <v-badge
          :value="[0, 1, 2].includes(index)"
          :color="sizeAndColorByRank(index).color"
          icon="mdi-crown"
          offset-x="28"
          offset-y="23"
          overlap
        >
          <v-list-item-avatar
            class="pointer"
            :size="sizeAndColorByRank(index).size"
            @click="$router.push(`/users/${user.id}`)"
          >
            <v-img :src="$avatar(user.avatar)"></v-img>
          </v-list-item-avatar>
        </v-badge>
        <v-list-item-content>
          <v-list-item-title class="text-subtitle-2"
            ><span
              class="pointer underline"
              v-text="user.username"
              @click="$router.push(`/users/${user.id}`)"
            ></span
          ></v-list-item-title>
          <v-list-item-subtitle v-text="user.nickname"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <div>{{ user.point }}pt</div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-sheet>
</template>

<script lang="ts">
import ordinal from "ordinal";
import { VueLoading } from "vue-loading-template";
import Vue from "vue";
export default Vue.extend({
  components: { VueLoading },
  data() {
    return {
      loading: true,
      users: [],
    };
  },
  computed: {
    // for watch store state variable.
    period() {
      return this.$accessor.ranking.getCurrentPeriod;
    },
  },
  watch: {
    period: {
      handler() {
        this.getRanking();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async getRanking(): Promise<void> {
      this.loading = true;
      try {
        const res = await this.$axios.$get("/users/ranking", {
          params: {
            period: this.period,
          },
        });
        this.users = res;
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    },
    sizeAndColorByRank(index: number): object {
      if (index === 0) {
        return { size: 48, color: "amber accent-4" };
      } else if (index === 1) {
        return { size: 43, color: "grey lighten-1" };
      } else if (index === 2) {
        return { size: 38, color: "brown lighten-1" };
      } else {
        return { size: 33, color: null };
      }
    },
    ordinal(number: number): string {
      return ordinal(number);
    },
  },
});
</script>

<style>
</style>