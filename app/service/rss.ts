import {Service} from 'egg';
import {links} from '../../typings';
const moment = require('moment');
// const EpubPress = require('epub-press-js'); // https://www.npmjs.com/package/epub-press-js
/*
 * Rss Service
 */
export default class Rss extends Service {
    /**
     * 解析rss链接
     */
    public async rssParse():Promise<Array<Object>>{
        let links:Array<links> = this.ctx.app.lowdb.model('links').find();
        let arr:Array<any> = [];
        for(let item of links){
            if(item.enable){
                this.logger.info('parse url :' +item.link);
                try{
                    let feed = await this.ctx.app.rssParser.parseURL(item.link);
                    if(true || feed && feed.lastBuildDate && (!item.lastDate || new Date(feed.lastBuildDate) > new Date(item.lastDate))){
                        let data:any = {
                            name: item.name,
                            link: feed.link,
                            title: feed.title,
                            lastBuildDate: feed.lastBuildDate
                        };
                        data.content = [];
                        feed.items.forEach(item => {
                            /**
                             * 'title',
                             'item',
                             'pubDate',
                             'author',
                             'content',
                             'contentSnippet',
                             'id',
                             'isoDate'
                             */
                            let {title,link,author,content,id,pubDate,isoDate} = item;
                            data.content.push({title,link,author,content,id,pubDate,isoDate})
                        });
                        //更新最后时间
                        this.ctx.app.lowdb.model('links').findAndUpdate({link:item.link}, {lastDate:feed.lastBuildDate});
                        arr.push(data)
                    }
                }catch (e) {
                    this.logger.error('parse error url :' +item, 'err:'+ e);
                }
            }
        }
        return arr;
    }

    /**
     * 覆盖写入每天
     */
    public async rssWrite(arr:Array<Object>){
        if(arr && arr.length)
        await this.ctx.app.lowdb.model('date_'+ moment().format('Y-M-D')).removeAll().add(arr);
    }

    /**
     *
     */
    public async findByName(name:string){
        return this.ctx.app.lowdb.model('links').find({name: name });
    }
}
