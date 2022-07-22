import { MockMethods, MockResponse } from 'axios-mock-server';
import { Company } from '../../type';

const list: MockMethods = {
  get: async (): Promise<MockResponse> => {
    const data: Company[] = [
      {
        id: 1,
        name: 'A'
      },
      {
        id: 2,
        name: 'B'
      }
    ];
    return [200, data]; // 200 はステータスコード
  }
};

export default list; // ここは `default export` にしないと動かない