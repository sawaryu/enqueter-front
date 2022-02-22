<template>
  <v-sheet color="rgb(0, 0, 0, 0)" flat>
    <v-card-title class="font-weight-light">
      <v-icon>mdi-crown</v-icon>Ranking
      <v-spacer></v-spacer>
      <v-btn
        small
        rounded
        outlined
        @click="changeCategory"
        :ripple="false"
        v-text="category"
      ></v-btn>
    </v-card-title>
    <v-subheader>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption text--secondary font-weight-light"
        >Regularly aggregated.</span
      >
      <v-spacer></v-spacer>
      <PeriodsBtn />
    </v-subheader>
    <v-divider></v-divider>

    <v-list color="rgb(0, 0, 0, 0)" dense height="40vh" class="overflow-y-auto">
      <Loading v-if="loading" />

      <v-list-item
        v-else-if="users.length"
        v-for="(user, index) in users"
        :key="user.id"
        :class="{'current-user' : user.id === $auth.user.id}"
      >
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
          <div v-if="category === 'point'">{{ user.point }} pt</div>
          <div v-else>{{ user.response }} res</div>
        </v-list-item-action>
      </v-list-item>

      <v-list-item v-else>
        <v-list-item-action-text class="mx-auto my-auto">
          No users ranked yet.
        </v-list-item-action-text>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-sheet>
</template>

<script lang="ts">
const CATEGORY = {
  point: "point",
  response: "response",
};
import ordinal from "ordinal";
import Vue from "vue";
export default Vue.extend({
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    period() {
      return this.$accessor.ranking.getCurrentPeriod;
    },
    category() {
      return this.$accessor.ranking.getCurrentCategory;
    },
  },
  watch: {
    period() {
      this.getRanking();
    },
    category() {
      this.getRanking();
    },
  },
  methods: {
    async getRanking(): Promise<void> {
      const url = `/users/${this.category}_ranking`;
      this.loading = true;
      try {
        const res = await this.$axios.$get(url, {
          params: {
            period: this.period,
          },
        });
        this.$emit("getRanking", res);
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
    changeCategory(): void {
      if (this.category === CATEGORY.point) {
        this.$accessor.ranking.setCurrentCategory(CATEGORY.response);
      } else {
        this.$accessor.ranking.setCurrentCategory(CATEGORY.point);
      }
    },
  },
});
</script>

<style scoped>
.current-user {
  background-color:rgba(192, 192, 192, 0.34);
  border-radius: 1%;
}
</style>