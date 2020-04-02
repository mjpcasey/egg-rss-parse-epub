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
    public pagePath;
    private name: String;
    public async rssParseEpub (rssArray:Array<rssArr>){
        // 打包目录
        // 分批订阅
        for(let item of rssArray){
            await this.init(item.name);
            await this.copy();
            await this.contentEjs(item);
            await this.image();
            await this.cover();
            await this.zipCmd();
            await this.removeDir();
        }
    }
    /**
     * 初始化
     */
    private init(name:String) {
        this.name = name;
        // 输出目录
        this.outPath = path.join(__dirname,"../../run/out/");
        // 复制模版
        this.copyPath = path.join(__dirname,"../public/");
        this.contentEjsPath = path.join(this.copyPath,"./ejs/content.ejs");
        // temp目录
        this.tempPath = path.join(__dirname,"../../run/temp/");
        this.contentOpfPath = path.join(this.tempPath,"./OEBPS/content.html");
        this.pagePath = path.join(this.tempPath,"./OEBPS/page/");
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
                `cd ${ path.join(this.copyPath, './template') }
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
        let out = path.join(this.outPath,`./${this.name}.epub`);
        return new Promise((ok)=>{
            cmd.get(
                `cd ${this.tempPath} && zip -0Xq  ${out} mimetype && zip -Xr9Dq ${out} *`,
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
