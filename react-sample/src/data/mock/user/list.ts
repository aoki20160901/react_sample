import { MockMethods, MockResponse } from 'axios-mock-server';
import { User } from '../../type';

const list: MockMethods = {
  get: async (): Promise<MockResponse> => {
    const data: User[] = [
      {
        id: "1",
        name: "あああああああ",
        company: "ああああ商事",
        tel: "03-1111-2222"
      },
      {
        id: "2",
        name: "あああああああ",
        company: "ああああ商事",
        tel: "03-1111-2222"
      }
    ];
    return [200, data]; // 200 はステータスコード
  }
};

export default list; // ここは `default export` にしないと動かない