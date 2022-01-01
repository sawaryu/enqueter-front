<template>
  <v-btn small :outlined="relationshipBtn.outlined" @click="follow">{{
    relationshipBtn.text
  }}</v-btn>
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
      required: true,
      type: Object,
    } as PropOptions<User>,
  },
  methods: {
    async follow() {
      if (this.user.is_following) {
        // un follow
        try {
          const res = await this.$axios.$delete("/users/relationships", {
            data: {
              target_id: this.user.id,
            },
          });
          this.$emit("follow");
        } catch (error) {}
      } else {
        // follow
        try {
          const res = await this.$axios.$post("/users/relationships", {
            target_id: this.user.id
          });
          this.$emit("follow");
        } catch (error) {}
      }
    },
  },
  computed: {
    relationshipBtn() {
      if (this.user.is_following) {
        return {
          outlined: true as boolean,
          text: "following" as string,
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