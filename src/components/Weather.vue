<template>
  <div class="container p-0">
    <div class="d-flex">
      <div class="main-div w-100">
        <div class="p-3">
          <div class="mb-1 day">Today</div>
          <div class="text-light date mb-0">{{ date }}</div>
          <small>time</small>
          <h2 class="place">
            <i class="fa fa-location"
              >{{ name }} <small>{{ country }}</small></i
            >
          </h2>
          <div class="temp">
            <h1 class="weather-temp">{{ temperature }}&deg;C</h1>
            <h2 class="text-light">
              {{ description }} <img :src="iconUrl" alt="Weather Icon" />
            </h2>
          </div>
        </div>
      </div>
      <div class="card-2 w-100">
        <table class="m-4">
          <tbody>
            <tr>
              <th>Pressure</th>
              <td>{{ pressure }}</td>
            </tr>
            <tr>
              <th>Humidity</th>
              <td>{{ humidity }}</td>
            </tr>
            <tr>
              <th>Wind</th>
              <td>{{ wind }}</td>
            </tr>
          </tbody>
        </table>
        <DaysWeatherVue :cityName="cityName"></DaysWeatherVue>
        <div id="div_Form" class="d-flex m-3 justify-content-center">
          <form action="">
            <input
              @click="changeLocation"
              type="button"
              value="Change Location"
              class="btn change-btn btn-primary"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DaysWeatherVue from "./DaysWeather.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import axios from "axios";
export default {
  name: "WeatherData",
  components: { DaysWeatherVue },
  props: {
    city: String,
  },
  data() {
    return {
      cityName: this.city,
      temperature: null,
      description: null,
      iconUrl: null,
      date: null,
      time: null,
      name: null,
      pressure: null,
      wind: null,
      humidity: null,
      country: null,
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  methods: {
    changeLocation() {
      window.location.reload();
    },
  },
  async created() {
    const $toast = useToast();
    if (!this.city || this.city.trim() === "") {
      $toast.error("Error!!! City name should not be empty or invalid", {
        duration: 5000,
      });
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=11b09038c500729b7a4aabff30753325`
      );

      const weatherData = response.data;
      this.temperature = Math.round(weatherData.main.temp);
      this.description = weatherData.weather[0].description;
      this.name = weatherData.name;
      this.wind = weatherData.wind.speed;
      this.country = weatherData.sys.country;
      this.pressure = weatherData.main.pressure;
      this.humidity = weatherData.main.humidity;
      this.iconUrl = `https://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      const d = new Date();
      this.date =
        d.getDate() +
        "-" +
        this.monthNames[d.getMonth()] +
        "-" +
        d.getFullYear();
      this.time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    } catch (error) {
      this.temperature = null;
      this.description = "N/A";
      this.name = "N/A";
      this.wind = "N/A";
      this.country = "N/A";
      this.pressure = "N/A";
      this.humidity = "N/A";
      this.iconUrl = null;
      this.date = null;
      this.time = null;
    }
  },
};
</script>

<style scoped>
.weather-temp {
  margin: 0;
  font-weight: 3rem;
  font-size: 400;
}

h2.mb-1.day {
  font-size: 3rem;
  font-weight: 400;
}

.main-div {
  border-radius: 20px;
  color: #fff;
  background-image: url("/src/assets/Sea_Water_Wave_and_Sand_Background-336.jpeg");
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
}

.temp {
  position: relative;
  margin-top: 160px;
}

.main-div:hover {
  transform: scale(1.1);
  transition: transform 0.5s ease;
  z-index: 1;
}

.card-2 {
  background-color: #212730;
  border-radius: 20px;
}

.card-details {
  margin-left: 19px;
}

.h1_left {
  position: absolute;
  bottom: 25px;
  left: 16px;
  font-size: 3vw;
  line-height: 1.2;
}

.h3_left {
  position: absolute;
  left: 16px;
  font-size: 2vw;
  line-height: 0.5;
}

.h3_left small {
  font-size: 1rem;
}

table {
  position: relative;
  left: 15px;
  border-collapse: separate;
  border-spacing: 15px;
  text-align: left;
  width: 85%;
  max-width: 600px;
  margin: 0 auto;
}

th,
td {
  font-size: 18px;
  color: #fff;
}

td {
  text-align: right;
}

table,
tr:hover {
  color: red;
}

.change_btn {
  background-image: linear-gradient(to right, cyan, magenta);
}

.change_btn:hover {
  transform: scale(0.9);
  transition: transform 0.1s ease;
}
</style>
