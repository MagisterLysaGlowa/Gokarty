/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

/**
 * Rekurencyjna funkcja zamieniająca stringi datowe na obiekty `Date`
 */
const parseDates = (obj: any): any => {
  if (
    typeof obj === "string" &&
    obj.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  ) {
    return new Date(obj);
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      obj[key] = parseDates(obj[key]);
    }
  }
  return obj;
};

// Tworzenie instancji Axios
const apiClient = axios.create({
  baseURL: "http://localhost:5079/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor odpowiedzi – automatyczna konwersja stringów na `Date`
apiClient.interceptors.response.use((response: AxiosResponse) => {
  response.data = parseDates(response.data);
  return response;
});

export default apiClient;
