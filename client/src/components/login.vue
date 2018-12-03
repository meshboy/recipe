<template>
  <div class="container">
    <h5 class="text-center">Sign into Recipe</h5>
    <div class="col-4 offset-md-4">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        >
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        >
      </div>
      <div class="form-group" v-if="error != null">
        <p class="text-danger text-center">{{ error }}</p>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary form-control" @click="login()">Login</button>
      </div>
      <div class="form-group">
        <p @click="$router.push({ name: 'register' })" class="text-center">Create Account</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as querys from "../query";
import { parseGraphqlError } from "../util";

export default {
  name: "login",
  created() {},
  data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    async login() {
      const loginObject = {
        email: this.email,
        password: this.password
      };
      await this.$apollo
        .mutate({
          mutation: querys.LOGIN_QUERY,
          variables: { input: loginObject }
        })
        .then(({ data }) => {
          const { token } = data.user;
          localStorage.setItem("token", token);
          this.$router.push({ name: "all-recipes" });
        })
        .catch(err => {
          console.log(err)
          this.error =
            parseGraphqlError(err) || "Something went wrong. Try again...";
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 70px;
}

p:hover {
  color: grey;
  cursor: pointer;
}
</style>
