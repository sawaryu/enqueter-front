<template>
  <v-dialog
    :value="$accessor.dialog.getQuestionDialog"
    @input="$accessor.dialog.setQuestionDialog(false)"
    width="500"
  >
    <v-card>
      <v-card-title>
        <v-icon size="35">mdi-file-question</v-icon>Create Question.
        <v-spacer></v-spacer>
        <v-btn icon @click="$accessor.dialog.setQuestionDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-textarea
          color="black"
          maxlength="255"
          counter="255"
          dense
        >
        </v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn>create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>