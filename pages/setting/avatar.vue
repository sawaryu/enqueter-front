<template>
  <v-form class="mb-15" ref="form" v-model="valid" lazy-validation>
    <!-- loading -->
    <v-overlay :value="loading">
      <v-progress-circular
        color="black"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <!-- current avatar -->
    <v-avatar v-if="!avatar" size="110">
      <v-img :src="$avatar($auth.user.avatar)"></v-img>
    </v-avatar>

    <!-- selected avatar -->
    <v-avatar v-else size="110" class="mb-3">
      <v-img :src="avatar"></v-img>
    </v-avatar>

    <v-file-input
      ref="inputFile"
      counter
      show-size
      :rules="rules"
      accept="image/png, image/jpeg, image/jpg"
      prepend-icon="mdi-camera"
      color="grey darken-3"
      v-on:change="fileSelected"
    ></v-file-input>

    <submit :disabled="isDisabled" @click="update">update</submit>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      rules: [
        (value: any) =>
          !value || value.size < 2000000 || "File size must be less than 2MB.",
      ],
      valid: true as boolean,
      loading: false as boolean,
      avatar: "" as any,
    };
  },
  methods: {
    async update(): Promise<void> {
      if (!(this.$refs as any).form.validate() || this.avatar == "") {
        return;
      }

      this.loading = true;
      const formData = new FormData();
      formData.append("image", this.avatar);
      try {
        const res = await this.$axios.$post("/upload", formData, {});
        this.avatar = "";
        (this.$refs as any).inputFile.reset();
        this.$auth.fetchUser();
        this.$accessor.flash.showMessage(
          {
            message: `Updated completely your avatar.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },
    fileSelected(event: any): void {
      if (event !== undefined && event !== null) {
        if (event.name.lastIndexOf(".") <= 0) {
          return;
        }
        const file = new FileReader();
        file.readAsDataURL(event);
        file.addEventListener("load", () => {
          this.avatar = file.result;
        });
      } else {
        this.avatar = "";
      }
    },
  },
  computed: {
    isDisabled(): boolean {
      return this.avatar == "";
    },
  },
});
</script>

<style>
</style>