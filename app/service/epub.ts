import {Service} from 'egg';
import * as path from "path";
const fs = require('fs');
const cmd = require('node-cmd');
const ejs = require('ejs');
import {rssArr} from '../../typings';

// const EpubPress = require('epub-press-js'); // https://www.npmjs.com/package/epub-press-js
// const cheerio = require('cheerio');
/*
 * Rss Service
 */
export default class Epub extends Service {
    public outPath;
    public tempPath;
    public copyPath;
    public content;
    public contentEjsPath;
    public contentOpfPath;
    public pageEjsPath;
    public pagePath;
    public async rssParseEpub (rssArray:Array<rssArr>){
        // 打包目录
        // 分批订阅
        for(let item of rssArray){
            await this.init(item.name);
            await this.copy();
            await this.contentEjs(item);
            await this.page();
            await this.image();
            await this.cover();
            await this.zipCmd();
            // await this.removeDir();
        }
    }
    /**
     * 初始化
     */
    private init(name:String) {
        // 输出目录
        this.outPath = path.join(__dirname,"../../run/out/"+name);
        // 复制模版
        this.copyPath = path.join(__dirname,"../public");
        // temp目录
        this.tempPath = path.join(__dirname,"../../run/temp/");
        this.contentEjsPath = path.join(this.tempPath,"./OEBPS/content.ejs");
        this.contentOpfPath = path.join(this.tempPath,"./OEBPS/content.opf");
        this.pagePath = path.join(this.tempPath,"./OEBPS/page/");
        this.pageEjsPath = path.join(this.tempPath,"./OEBPS/page/page.ejs");
        // 当前内容
        this.content = [];
        // 初始化目录
        if(!fs.existsSync(this.tempPath)){
            fs.mkdirSync(this.tempPath)
        }
        if(!fs.existsSync(this.outPath)){
            fs.mkdirSync(this.outPath,{recursive:true})
        }
    }

    /**
     * 初始化目录
     */
    private copy(){
        let self = this;
        return new Promise((ok)=>{
            cmd.get(
                `cd ${this.copyPath}
                 cp -rf ./ ${this.tempPath}`,
                function(err, data){
                    if (!err) {
                        self.logger.info('[]the node-cmd zip dir contains these files :\n\n',data);
                        ok(data);
                    } else {
                        self.logger.error('error', err)
                    }

                }
            );
        })
    }
    /**
     * 处理目录
     */
    private contentEjs(item){
        this.content = [];
        for(let i = 0 ; i< item.content.length; i++){
            let con = item.content[i];
            this.content.push({
                ...con,
                title: con.title,
                contentSlice: con.content && con.content.substr(0,40) || '',
                id:i
            })
        }
        let contentOpf = ejs.render(fs.readFileSync(this.contentEjsPath, 'utf-8'), {
            content: this.content,
            title: item.title,
            dateStr: item.lastBuildDate
        });
        fs.writeFileSync(this.contentOpfPath, contentOpf, {encoding: 'utf-8'})
    }

    /**
     * 处理页面
     */
    private page(){
        //  把内容根据ejs渲染成html放到page里面
        for(let i =0 ; i< this.content.length; i++){
            let con = this.content[i];
            let page = ejs.render(fs.readFileSync(this.pageEjsPath, 'utf-8'), {
                data: con
            });
            fs.writeFileSync(path.join(this.pagePath,`./${i}.html`), page, {encoding: 'utf-8'})
        }
    }
    /**
     * 处理图片
     */
    private image(){
        // 加载渲染图片的链接出来

        // 请求图片

        // 把图片放在image里

        // 替换掉链接里面的图片地址
    }
    /**
     * 处理封面
     */
    private cover(){

    }
    /**
     * 打包成epub
     */
    private async zipCmd(){
        return new Promise((ok)=>{
            cmd.get(
                `cd ${this.tempPath} && zip -0Xq  ${this.outPath}.epub mimetype && zip -Xr9Dq ${this.outPath}.epub *`,
                function(err, data){
                    if (!err) {
                        console.log('the node-cmd zip dir contains these files :\n\n',data);
                        ok(data);
                    } else {
                        console.log('error', err)
                    }

                }
            );
        })
    }
    private async removeDir(){
        return new Promise((ok)=>{
            cmd.get(
                `
                    cd ${this.tempPath}
                    rm -rf *
                 `,
                function(err, data){
                    if (!err) {
                        console.log('the node-cmd remove dir contains these files :\n\n',data)
                        ok(data);
                    } else {
                        console.log('error', err)
                    }

                }
            );
        })
    }

}
