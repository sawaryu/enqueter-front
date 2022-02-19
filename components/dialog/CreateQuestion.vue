<template>
  <v-dialog
    :value="$accessor.dialog.getQuestionDialog"
    @input="$accessor.dialog.setQuestionDialog(false)"
    transition="fade-transition"
    width="500"
  >
    <v-card class="rounded-lg">
      <v-card-title class="font-weight-light">
        <v-icon size="30">mdi-pencil</v-icon>Create Question.
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setQuestionDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pb-2">
        <v-form ref="form" v-model="valid" lazy-validation>
          <small>Question</small>
          <v-textarea
            filled
            v-model="questionModel.content"
            :rules="questionRules"
            color="black"
            maxlength="140"
            counter="140"
            dense
          >
          </v-textarea>

          <div class="d-flex justify-center mt-5">
            <div class="mr-3">
              <small>Option 1</small>
              <v-text-field
                counter="15"
                v-model="questionModel.option_first"
                :rules="optionRules"
                color="black"
                maxlength="15"
                rounded
                filled
              ></v-text-field>
            </div>
            <div class="ml-3">
              <small>Option 1</small>
              <v-text-field
                counter="15"
                v-model="questionModel.option_second"
                :rules="optionRules"
                color="black"
                maxlength="15"
                rounded
                filled
              ></v-text-field>
            </div>
          </div>
        </v-form>

        <div class="text-caption mt-3 mb-0">
          * A question will be closed after a week. <br />
          * Please create the question that divide people's answers.
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-3" dark @click="create">create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      valid: true,
      questionModel: {
        content: "",
        option_first: "",
        option_second: "",
      },
      questionRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) => v.length <= 140 || "Must be less than 255 characters",
      ],
      optionRules: [
        (v: string) => (!!v && /\S/.test(v)) || "Must be required",
        (v: string) => v.length <= 15 || "Must be less than 15 characters",
      ],
    };
  },
  methods: {
    async create(): Promise<void> {
      if (!(this.$refs.form as any).validate()) { return; }

      try {
        const res = await this.$axios.$post("/questions", this.questionModel);
        this.$accessor.flash.showMessage(
          {
            message: `Created completely new question.`,
            type: "success",
            status: true,
          },
          { root: true }
        );
        this.$accessor.dialog.setQuestionDialog(false);
        this.$router.push(`/questions/${res.data.id}`);
      } catch (error) {}
    },
  },
});
</script>

<style>
</style>