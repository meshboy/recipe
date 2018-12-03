<template>
  <div class="container">
    <h4 class="text-center">Create A Recipe</h4>
    <div class="col-4 offset-md-4 recipe-container">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="nameHelp"
          placeholder="Enter recipe name"
          v-model="recipeName"
        >
      </div>
      <div class="form-group">
        <label for="avg">Average Time</label>
        <input
          type="number"
          class="form-control"
          id="avg"
          placeholder="Enter AVerage Time it will take"
          v-model="averageTime"
        >
      </div>
      <div class="form-group">
        <label for="level">Difficulty Level</label>
        <input
          type="number"
          class="form-control"
          id="level"
          placeholder="How difficult is it to make this recipe ?"
          v-model="difficultyLevel"
        >
      </div>
      <div class="form-group">
        <label for="level">Add each steps to prepare recipe</label>
        <div class="form-row">
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              id="level"
              placeholder="Enter step"
              v-model="step"
            >
          </div>
          <div class="col-3">
            <button class="btn btn-info" @click="addRecipe(step)">Add Step</button>
          </div>
        </div>
        <ul>
          <li v-for="recipeStep in stepsList">{{ recipeStep }}</li>
        </ul>
      </div>
      <div class="form-group">
        <label for="file">Upload Recipe Image</label>
        <input type="file" class="form-control" id="file" v-on:change="onFileChange($event)">
      </div>
      <div class="form-group">
        <label for="description">A short description</label>
        <textarea class="form-control" id="description" rows="2" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <button
          type="submit"
          class="btn btn-primary form-control"
          @click="createRecipe()"
        >Create new recipe</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as query from "../../query";
import { parseGraphqlError } from "../../util";
export default {
  name: "create-recipe",
  data() {
    return {
      stepsList: [],
      recipeName: null,
      averageTime: null,
      difficultyLevel: null,
      recipeImage: null,
      description: null,
      step: null,
      image: null
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.image = files[0];
    },
    addRecipe(step) {
      if (step) {
        this.stepsList.push(step);
        this.step = null;
      }
    },

    async createRecipe() {
      const recipeObject = {
        name: this.recipeName,
        description: this.description,
        difficultyLevel: this.difficultyLevel
          ? parseInt(this.difficultyLevel)
          : 0,
        image: this.image,
        steps: this.stepsList,
        averageTimeForCompletion: this.averageTime
          ? parseInt(this.averageTime)
          : 0
      };
      console.log(recipeObject);
      await this.$apollo
        .mutate({
          mutation: query.CREATE_RECIPE_QUERY,
          variables: { input: recipeObject }
        })
        .then(({ data }) => {
            this.$router.push({ name: "my-recipes" });
        })
        .catch(err => {
          console.log(err);
          this.error =
            parseGraphqlError(err) || "Something went wrong. Try again...";
        });
    }
  }
};
</script>
<style scoped>
.container {
  margin-top: 10px;
}
.recipe-container {
  margin-top: 20px;
}
</style>
