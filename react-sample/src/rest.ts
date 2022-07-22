import axios, { AxiosResponse } from "axios";
import { mock } from './data/mock';

type Data = { [key: string]: string | number | boolean | object }

const rest = (() => {
  const client = axios.create({
    baseURL: '', // 今回はモックだけなので未指定（通常は env などから参照させる）
    timeout: 5000,
  });
  return {
    client,
    get: <T = any, R = AxiosResponse<T>>(url: string): Promise<R> => {
      return client.get(url);
    },
    post: <T = any, R = AxiosResponse<T>>(url: string, data: Data): Promise<R> => {
      return client.post(url, data);
    }
  }
})();

const useMock = true;
if (useMock) {
  mock(rest.client)
    .enableLog()
    .setDelayTime(500);
}

export { rest };