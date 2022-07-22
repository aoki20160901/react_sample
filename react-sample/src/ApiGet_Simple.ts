import axios from 'axios';

export const ApiGet_Simple = (URL:string):any => {
    axios
        .get(URL)
        .then((results) => {
            console.log(results.data);
            return results.data;
        })
        .catch((error) => {
            console.log('通信失敗');
            console.log(error.status);
            return
        });
};