<template>
  <v-card>
    <v-card-title><v-icon>mdi-crown</v-icon>Ranking </v-card-title>
    <v-divider></v-divider>
    <v-list dense max-height="60vh" class="overflow-y-auto">
      <v-list-item>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            v-for="period in periods"
            color="grey darken-2"
            dark
            :key="period.id"
            v-text="period.text"
            :text="period.id != $accessor.ranking.getCurrentPeriod"
            @click="$accessor.ranking.setCurrentPeriod(period.id)"
            x-small
          ></v-btn>
        </div>
      </v-list-item>
      <v-list-item v-for="(user, index) in users" :key="user.id">
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
              v-text="user.public_id"
              @click="$router.push(`/users/${user.id}`)"
            ></span
          ></v-list-item-title>
          <v-list-item-subtitle v-text="user.name"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <div>{{ user.total_point }}pt</div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import ordinal from "ordinal";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      users: [],
      periods: [
        { id: "week", text: "week" },
        { id: "month", text: "month" },
        { id: "all", text: "all" },
      ] as Array<object>,
    };
  },
  created() {
    this.getRanking();
  },
  methods: {
    async getRanking() {
      try {
        const res = await this.$axios.$get("/users/ranking", {
          params: {
            period: this.$accessor.ranking.getCurrentPeriod,
          },
        });
        this.users = res;
      } catch (error) {}
    },
    sizeAndColorByRank(index: number): {} {
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
  computed: {
    // for watch store state variable.
    period() {
      return this.$accessor.ranking.getCurrentPeriod;
    },
  },
  watch: {
    period() {
      this.getRanking();
    },
  },
});
</script>

<style>
</style>