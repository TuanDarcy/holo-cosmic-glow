import axios, { AxiosInstance } from "axios";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      },
    );
  }

  get<T>(url: string, config = {}) {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config = {}) {
    return this.client.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config = {}) {
    return this.client.put<T>(url, data, config);
  }

  delete<T>(url: string, config = {}) {
    return this.client.delete<T>(url, config);
  }
}

export default new ApiClient();
