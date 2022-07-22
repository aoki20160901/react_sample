import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { mock } from './mock';

type Data = { [key: string]: string | number | boolean | object } | FormData

let useMock = false

const rest = (() => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URI, // 今回はモックだけなので未指定（通常は env などから参照させる）
    timeout: 5000,
  });
  return {
    client,
    get: <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
      return client.get<T>(url, config);
    },
    post: <T = any>(url: string, data: Data, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
      return client.post<T>(url, data, config);
    },
    patch: <T = any>(url: string, payload: Data, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
      return client.patch<T>(url, payload, config);
    },
    delete: <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
      return client.delete<T>(url, config);
    },
  }
})();

if (process.env.NODE_ENV === "development") {
  useMock = false
}
// const useMock = true; // モックを使用するとき、TRUE指定
// const useMock = false; // モックを使用するとき、TRUE指定
if (useMock) {
  console.log("mock start");
  mock(rest.client)
    .enableLog()
    .setDelayTime(500);
}

export { rest };