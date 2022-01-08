<template>
  <v-btn
    :loading="loading"
    v-if="user.id !== $auth.user.id"
    small
    :outlined="relationshipBtn.outlined"
    @click="follow"
    >{{ relationshipBtn.text }}</v-btn
  >
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
interface User {
  id: number;
  is_following: boolean;
}
export default Vue.extend({
  props: {
    user: {
      required: false,
      type: Object,
    } as PropOptions<User>,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async follow() {
      if (this.user.is_following) {
        // un follow
        this.loading = true;
        try {
          const res = await this.$axios.$delete("/users/relationships", {
            data: {
              user_id: this.user.id,
            },
          });
          setTimeout(() => {
            this.$emit("follow");
          }, 400);
        } catch (error) {}
      } else {
        // follow
        this.loading = true;
        try {
          const res = await this.$axios.$post("/users/relationships", {
            user_id: this.user.id,
          });
          setTimeout(() => {
            this.$emit("follow");
          }, 400);
        } catch (error) {}
      }

      // finally
      setTimeout(() => {
        this.loading = false;
      }, 400);
    },
  },
  computed: {
    relationshipBtn() {
      if (this.user.is_following) {
        return {
          outlined: true as boolean,
          text: "unfollow" as string,
        };
      } else {
        return {
          outlined: false as boolean,
          text: "follow" as string,
        };
      }
    },
  },
});
</script>

<style>
</style>