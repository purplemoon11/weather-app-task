<template>
  <div class="app">
    <div class="header container">
      <div class="mb-5">Create Your Account</div>
      <div class="container">
        <form @submit.prevent="register">
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              v-model="email"
            />
          </div>
          <br />
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <br />
          <button class="btn btn-primary">Sign Up</button>
        </form>
        <br />
        <p>
          Already have account?
          <router-link to="/">Login</router-link>
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
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useToast } from "vue-toast-notification";

export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
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
    register() {
      const $toast = useToast();
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          $toast.success("User registered successfully !!!");
          this.$router.push("/");
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
