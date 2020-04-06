import axios from 'axios';
import qs from 'qs';
import graphqlClient from "./graphqlClient";
class http {
  static post(api: any, data: any) {
    let params = qs.stringify(data);
    return new Promise((resolve => {
      axios.post(api, params).then((res: unknown)=>{
          resolve(res)
      })
    }))
  }
  static gql(query_param: any,variables:any){
    return new Promise((resolve => {
      graphqlClient.query({
        query: query_param,
        variables: variables
      }).then((data)=>{
        resolve(data)
      })
      })
    )
  }
}
export default http;
