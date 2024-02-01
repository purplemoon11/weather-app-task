<template>
  <div class="app">
    <div class="header container h-100 p-5">
      <div class="mb-5">Weather App</div>
      <div class="container">
        <button
          @click="signInWithGoogle"
          class="btn btn-lg btn-block btn-primary"
          style="background-color: #dd4b39"
          type="submit"
        >
          <i class="fab fa-google me-2"></i> Sign in with google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
export default {
  name: "RegisterVue",
  methods: {
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then(() => {
          this.$router.push("/home");
        })
        .catch((err) => {
          throw Error("Something went wrong", err);
        });
    },
  },
};
</script>

<style>
body {
  background-color: #121212 !important;
}
.header {
  background-color: #212730;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-top: 5rem;
}
</style>
