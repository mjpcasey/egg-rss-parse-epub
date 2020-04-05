import {Controller} from 'egg';

export default class RssController extends Controller {
  public async index() {
    const { ctx } = this;
    const query = JSON.stringify({
      query: `{rss(name:"juejin"){name}}`,
    }); // graphql 的 query ，可以通过工具或者自己构造出来
    //主查询方法
    ctx.body = await ctx.service.graphql.query(query);
  }
}
