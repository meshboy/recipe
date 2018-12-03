<template>
  <div class="container">
      <h5 class="text-center">Create account in Recipe</h5>
    <div class="col-4 offset-md-4">
      <div class="form-group">
        <label for="email">Full Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter full name"
          v-model="name"
        >
      </div>
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
        <button
          type="submit"
          class="btn btn-primary form-control"
          @click="register()"
        >Create Account</button>
      </div>
      <div class="form-group">
        <p @click="$router.push({ name: 'login' }) " class="text-center">Login</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as querys from "../query";
import { parseGraphqlError } from "../util";

export default {
  name: "register",
  created() {},
  data() {
    return {
      name: null,
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    async register() {
      const registerationObject = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      await this.$apollo
        .mutate({
          mutation: querys.REGISTERATION_QUERY,
          variables: { input: registerationObject }
        })
        .then(({ data }) => {
          const { token } = data.user;
          localStorage.setItem("token", token);
          this.$router.push({ name: "all-recipes" });
        })
        .catch(err => {
          this.error =
            parseGraphqlError(err) || "Something went wrong. Try again...";
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}

p:hover {
  color: grey;
  cursor: pointer;
}
</style>
