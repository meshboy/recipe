import { uploadFile } from "../file";

import { Recipe } from "./recipe.model";
import { User } from "../user/user.model";
import { throwErrorIfUserNotAuthenticated } from "../../modules/auth";

const createRecipe = async (root, { input }, { user }) => {
  throwErrorIfUserNotAuthenticated(user);

  //    bring out the image from input for file processing
  const { image, ...recipeObject } = await input;

  let url = "";
  if (image) {
    const result = await uploadFile(image);
    url = result.url;
  }

  const recipe = await Recipe.findOne({ name: input.name.toLowerCase() });
  if (recipe) {
    throw new Error("Recipe already exists!");
  }
  Object.assign(recipeObject, { image: url, userId: user.id });
  return Recipe.create(recipeObject);
};

const updateRecipe = (root, { input }, { user }) => {
  throwErrorIfUserNotAuthenticated(user);
  const { id, ...update } = input;
  return Recipe.findByIdAndUpdate(id, update, { new: true }).exec();
};

const deleteRecipe = (root, { id }, { user }) => {
  throwErrorIfUserNotAuthenticated(user);
  return Recipe.findOneAndRemove(id).exec();
};

const getRecipe = (root, _, { user }) => {
  throwErrorIfUserNotAuthenticated(user);
  return Recipe.findById(user.id).exec();
};

const getAllRecipes = (root, _, { user }) => {
  throwErrorIfUserNotAuthenticated(user);
  return Recipe.find({});
};

export const recipeResolvers = {
  Query: {
    Recipe: getRecipe,
    Recipes: getAllRecipes
  },

  Mutation: {
    deleteRecipe,
    updateRecipe,
    newRecipe: createRecipe
  },

  /**
   * just like we have resolved Recipe in the Query object,
   * we also need to resolve the user. In the graphql schema, the object of concern here is
   * Recipe, in recipe, we moved down to user. The root value would definitely be recipe document
   */
  Recipe: {
    user: (root, args) => {
      return User.findOne({ id: root.user });
    }
  }
};
