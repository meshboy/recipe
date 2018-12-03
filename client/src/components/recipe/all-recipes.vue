<template>
  <div id="container">
    <div class="row">
      <div class="col-3 recipe" v-for="recipe in recipeList">
        <div style="width: 18rem;">
          <img class="card-img-top" :src="recipe.image || defaulIcon" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">{{ recipe.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as query from "../../query";

import defaultImage from "../../assets/default-image.jpeg";
export default {
  name: "all-recipes",
  data() {
    return {
      recipeList: [],
      defaulIcon: defaultImage
    };
  },
  apollo: {
    recipeList: query.ALL_RECIPES_QUERY
  },
  created() {
      
  },
  methods: {}
};
</script>

<style scoped>
#container {
  margin: 20px;
}
.recipe:hover {
  cursor: pointer;
}
</style>

