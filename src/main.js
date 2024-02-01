import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { initializeApp } from "firebase/app";
import router from "./router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA-d5yBmPSZycvP89MlBym3gHmrIYPOdPY",
  authDomain: "weather-app-6ef7b.firebaseapp.com",
  projectId: "weather-app-6ef7b",
  storageBucket: "weather-app-6ef7b.appspot.com",
  messagingSenderId: "934708738614",
  appId: "1:934708738614:web:e96e85962e2ad106ca7697",
  measurementId: "G-5DHBS68WQ5",
};

initializeApp(firebaseConfig);

const app = createApp({}).use(router);
app.use(ToastPlugin);
createApp(App).use(router).mount("#app");
