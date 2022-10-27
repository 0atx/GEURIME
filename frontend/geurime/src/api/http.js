import axios, { AxiosRequestConfig } from "axios";

function Instance() {
  const axiosConfig = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  };

  const http = axios.create(axiosConfig);

  // request interceptor 요청 전 헤더에 토큰 등록
  http.interceptors.request.use(
    (config) => {
      config.headers["accessToken"] = localStorage.getItem("accessToken");
      config.headers["refreshToken"] = localStorage.getItem("refreshToken");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response interceptor 요청 응답 받은 후 데이터 가공
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;

      if (status === 500 && originalRequest._retry == undefined) {
        // token refresh 요청
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/oauth/refresh`, // token refresh api
          {
            headers: {
              refreshToken: localStorage.getItem("refreshToken"),
            },
          }
        );
        // 새로운 토큰 저장
        const { accessToken: newAccessToken, accessTokenExpiration } = data;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("accessTokenExpiration", accessTokenExpiration);

        http.defaults.headers["refreshToken"] =
          localStorage.getItem("refreshToken");
        originalRequest.headers["accessToken"] = newAccessToken;

        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      } else if (status === 403) {
        window.location.replace("/");
      }
      return Promise.reject(error);
    }
  );
  return http;
}

export const http = Instance();