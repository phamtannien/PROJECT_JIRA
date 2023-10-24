import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/api";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// request.interceptors.request.use((config) => {
//   let accessToken = null;
//   const state = store.getState();

//   if (state.userReducer.userInfo) {
//     accessToken = state.userReducer.userInfo.accessToken;

//     config.headers.Authorization = `Bearer ${accessToken}`
//   }
//   return config;
// });

export { request };
