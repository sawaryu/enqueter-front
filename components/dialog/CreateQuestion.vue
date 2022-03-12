<template>
  <v-dialog
    :value="$accessor.dialog.getQuestionDialog"
    @input="$accessor.dialog.setQuestionDialog(false)"
    transition="fade-transition"
    width="500"
  >
    <v-card class="rounded-lg pa-2">
      <v-card-title class="font-weight-light">
        <v-icon size="30">mdi-pencil</v-icon>Create Question
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setQuestionDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pb-2">
        <v-form ref="form" v-model="valid" lazy-validation>
          <small class="font-weight-bold">Question</small>
          <v-textarea
            outlined
            style="font-size: 25px"
            v-model="questionModel.content"
            :rules="questionRules"
            maxlength="140"
            counter="140"
            dense
          >
          </v-textarea>

          <div class="d-flex justify-center mt-5">
            <div class="mr-3">
              <small class="font-weight-bold">Option 1</small>
              <v-text-field
                counter="15"
                outlined
                v-model="questionModel.option_first"
                :rules="optionRules"
                maxlength="15"
                rounded
              ></v-text-field>
            </div>
            <div class="ml-3">
              <small class="font-weight-bold">Option 2</small>
              <v-text-field
                counter="15"
                outlined
                v-model="questionModel.option_second"
                :rules="optionRules"
                maxlength="15"
                rounded
              ></v-text-field>
            </div>
          </div>

          <div class="text-caption ml-2">
            * Please create a question that will likely divide people's answers.
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <submit @click="create"></submit>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { questionRules, optionRules } from "@/common/validators/validator";
import Vue from "vue";
type QuestionModel = {
  content: string;
  option_first: string;
  option_second: string;
};
export default Vue.extend({
  data() {
    return {
      valid: true,
      questionModel: {
        content: "",
        option_first: "",
        option_second: "",
      } as QuestionModel,
      questionRules: questionRules,
      optionRules: optionRules,
    };
  },
  methods: {
    async create(): Promise<void> {
      if (!(this.$refs.form as any).validate()) {
        return;
      }

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