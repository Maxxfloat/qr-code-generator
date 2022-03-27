import axios from "axios";

const instance = axios.create({
  baseURL: "https://qrtiger.com/api/qr/static",
  headers: {
    Authorization: "Bearer ab4efc70-acf8-11ec-9b9c-e1f74bb3f9da",
  },
});

export default instance;
