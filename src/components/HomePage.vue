<template>
  <div class="app">
    <div class="header container h-100 p-5">
      <div class="mb-5">Weather App</div>
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar w-50 mx-2">
          <input
            type="text"
            class="input form-control"
            v-model="city"
            placeholder="Enter a city"
          />
        </div>
        <button class="btn-search btn btn-primary" @click="searchWeather">
          Search <i class="fas fa-search"></i>
        </button>
      </div>
      <button @click="handleSignOut" class="btn btn-danger mt-3">
        Sign Out
      </button>
    </div>
    <br />
    <Weather :city="city" v-if="showWeather"></Weather>
  </div>
</template>

<script>
import Weather from "./Weather.vue";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "HomePage",
  components: { Weather },
  data() {
    return {
      city: "",
      showWeather: false,
    };
  },
  methods: {
    async searchWeather() {
      this.showWeather = false;
      await this.$nextTick();
      this.showWeather = true;
    },
    handleSignOut() {
      const auth = getAuth();

      console.log("Before Sign Out - Auth:", auth);

      signOut(auth)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          throw Error("Something went wrong", error);
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

.btn-search {
}
</style>
