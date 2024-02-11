import axios from "axios";
import { store } from "./Store";
import { selectToken } from "./authSlice";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const token = selectToken(store.getState());
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
