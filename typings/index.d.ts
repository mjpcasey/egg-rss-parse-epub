import 'egg';

export declare module 'egg' {

    // 扩展 service
    interface IService {
        news: News;
    }

    // 扩展 app
    interface Application {
        lowdb: any,
        rssParser: any
    }

    // 扩展 context
    interface Context {

    }

    // 扩展你的配置
    interface EggAppConfig {

    }

    // 扩展自定义环境
    type EggEnvType = 'local' | 'unittest' | 'prod' | 'sit';
}

export declare module rssParser{
    interface dbModel {
        constructor(name:String,path:String);
        add(obj:Object<any>);
        findAndUpdate(query:Object<any>,set:Object<any>);
        remove(query:Object<any>);
        find(query:Object<any>,option:{sortBy:String,limit:Number,[props:any]:any});
        map(key:String)
    }
}

/**
 * db 自定义
 *   {
      "link": "http://www.xxx.com/rss",
      "name": "阮一峰的网络杂志",
      "enable": true,
      "lastDate": "2020-03-26T01:12:15Z"
    }
 */
export class links{
    link:String;
    enable:Boolean;
    name:String;
    lastDate; // 最后更新时间
}

declare module moment{}
declare module "epub-press-js"{}
