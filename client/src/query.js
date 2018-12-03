import gql from "graphql-tag";

// user object pointing to loginUser to make the return response pretty
export const LOGIN_QUERY = gql`
  mutation LoginUser($input: LoginUser!) {
    user: loginUser(input: $input) {
      token
    }
  }
`;

export const REGISTERATION_QUERY = gql`
  mutation RegisterUser($input: NewUser!) {
    user: createUser(input: $input) {
      token
    }
  }
`;

export const ALL_RECIPES_QUERY = gql`
  query {
    recipeList: Recipes {
      id
      name
      image
    }
  }
`;

export const GET_USER_QUERY = gql`
  query {
    user: getMe {
      name
      email
      recipes {
        id
        name
        image
      }
    }
  }
`;

export const CREATE_RECIPE_QUERY = gql`
  mutation createRecipe($input: NewRecipe!) {
    newRecipe(input: $input) {
      id
    }
  }
`;