import Vue from "vue";
import VueRouter from "vue-router";

const LoginComponent = resolve => {
  require.ensure(["./components/login"], () => {
    resolve(require("./components/login"));
  });
};

const registrationComponent = resolve => {
  require.ensure(["./components/registration"], () => {
    resolve(require("./components/registration"));
  });
};

const createRecipeComponent = resolve => {
  require.ensure(["./components/recipe/create-recipe"], () => {
    resolve(require("./components/recipe/create-recipe"));
  })
}

const myRecipesComponent = resolve => {
  require.ensure(["./components/recipe/my-recipe"], () => {
    resolve(require("./components/recipe/my-recipe"));
  });
}

const allRecipesComponent = resolve => {
  require.ensure(["./components/recipe/all-recipes"], () => {
    resolve(require("./components/recipe/all-recipes"));
  });
}

const recipeComponent = resolve => {
  require.ensure(["./components/recipe/root"], () => {
    resolve(require("./components/recipe/root"));
  });
}


Vue.use(VueRouter);

let routes = [
  {
    path: "",
    components: { default: LoginComponent },
    children: [
      {
        path: "login",
        component: LoginComponent,
        name: "login"
      }
    ]
  },
  {
    path: "/register",
    name: "register",
    components: {
      default: registrationComponent
    }
  },
  {
    path: "/recipe",
    components: { default: recipeComponent },
    children: [
      {
        path: "new",
        component: createRecipeComponent,
        name: "create-recipe"
      },
      {
        path: "own",
        component: myRecipesComponent,
        name: "my-recipes"
      },
      {
        path: "list",
        component: allRecipesComponent,
        name: "all-recipes"
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
];

const route = new VueRouter({
  routes,
  mode: "history"
});

route.beforeEach((to, from, next) => {
  let shouldProceedToRoute = false;

  const token = localStorage.getItem("token");
  if (token) {
    shouldProceedToRoute = true;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (shouldProceedToRoute) {
      next();
    } else {
      next({ name: "login" });
    }
  } else if (shouldProceedToRoute) {
    next({ name: "all-recipes" });
  } else {
    next();
  }
});
export default route;
