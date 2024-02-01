import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import WeatherData from "../../src/components/Weather.vue";
import DaysWeather from "../../src/components/DaysWeather.vue";

describe("App.vue", () => {
  it("renders correctly", async () => {
    const wrapper = shallowMount(App);

    expect(wrapper.vm.city).toBe("");
    expect(wrapper.vm.showWeather).toBe(false);

    await wrapper.setData({ city: "London" });

    await wrapper.find(".btn-search").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showWeather).toBe(true);

    expect(wrapper.findComponent({ name: "Weather" }).exists()).toBe(true);
  });
});

describe("WeatherData", () => {
  it("renders properly with mock data", async () => {
    jest.mock("axios", () => ({
      get: jest.fn(() => Promise.resolve({ data: mockWeatherData })),
    }));

    const mockWeatherData = {
      main: {
        temperature: 25,
        pressure: 1015,
        humidity: 60,
      },
      weather: [
        {
          description: "Clear",
          icon: "01d",
        },
      ],
      name: "Mock City",
      wind: {
        speed: 5,
      },
      sys: {
        country: "US",
      },
    };

    const wrapper = shallowMount(WeatherData, {
      props: {
        city: "Mock City",
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".weather-temp").text()).toBe("°C");
    expect(wrapper.find(".place").text()).toBe("");
  });
});

describe("DaysWeather", () => {
  it("renders properly with mock data", async () => {
    jest.mock("axios", () => ({
      get: jest.fn(() => Promise.resolve({ data: mockForecastData })),
    }));

    const mockForecastData = [
      {
        date: "2022-12-01",
        temperature: 20,
        iconUrl: "mock-icon-url",
      },
      {
        date: "2022-12-02",
        temperature: 22,
        iconUrl: "mock-icon-url",
      },
    ];

    const wrapper = shallowMount(DaysWeather, {
      props: {
        cityName: "Mock City",
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find(".no-data").exists()).toBe(false);
  });
});
