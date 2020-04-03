import { Controller } from 'egg';

export default class RssController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'hello egg!';
  }
}
