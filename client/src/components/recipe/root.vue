<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Recipe</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            tag="a"
            to="/recipe/list"
            active-class="active"
            class="nav-item nav-link"
          >All Recipes</router-link>
          <router-link
            tag="a"
            to="/recipe/own"
            active-class="active"
            class="nav-item nav-link"
          >My Recipe</router-link>
          <router-link
            tag="a"
            to="/recipe/new"
            active-class="active"
            class="nav-item nav-link"
          >Create Recipe</router-link>
        </div>
      </div>
      <a href @click="logout()">
        <i class="lnr lnr-exit"></i>
        <span>Logout</span>
      </a>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "root",
  created() {},
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "/login" })
;    }
  }
};
</script>
