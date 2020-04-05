import axios from 'axios';
import qs from 'qs';

class http {
  static post(api: any, data: any) {
    let params = qs.stringify(data);
    return new Promise((resolve => {
      axios.post(api, params).then((res: unknown)=>{
          resolve(res)
      })
    }))
  }
}
export default http;
