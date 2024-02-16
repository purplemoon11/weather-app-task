<template>
  <div class="app">
    <div class="header container">
      <div class="mb-5">Sign In To Your Account</div>
      <div class="container">
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              v-model="email"
            />
          </div>
          <br />
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <br />
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <br />
        <p>
          Don't have an account?
          <router-link to="/register">Register</router-link>
          Or
        </p>

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
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useToast } from "vue-toast-notification";
export default {
  name: "LoginForm",
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
    login() {
      const $toast = useToast();
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          $toast.success("User loggedin successfully !!!");
          this.$router.push("/home");
        })
        .catch((error) => {
          $toast.error(error.message);
        });
    },
  },
};
</script>

<style scoped>
.header {
  width: 50%;
  height: 50vh;
  background-color: #212730;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-family: sans-serif;
  margin-top: 10rem;
}
</style>
