import axios from "axios";

export const citiesApi = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
});
