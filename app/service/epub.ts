import {Service} from 'egg';
import * as path from "path";
// const cheerio = require('cheerio');
// const request = require('sync-request');
const fs = require('fs');
const cmd = require('node-cmd');
// const process = require('process');
const ejs = require('ejs');
// const EpubPress = require('epub-press-js'); // https://www.npmjs.com/package/epub-press-js
class rssArr {
    link:String;
    name:String;
    title:String;
    content:Array<any>;
    lastBuildDate:String;
}
/*
 * Rss Service
 */
export default class Epub extends Service {
    public outPath;
    public tempPath;
    public copyPath;
    public contentPath;
    public content;
    public contentOpfPath;
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
            await this.removeDir();
        }
    }
    /**
     * 初始化
     */
    private init(name:String) {
        // temp目录
        this.outPath = path.join(__dirname,"../../run/out/"+name);
        this.copyPath = path.join(__dirname,"../public");

        this.tempPath = path.join(__dirname,"../../run/temp/");
        this.contentPath = path.join(this.tempPath,"./OEBPS/content.ejs");
        this.contentOpfPath = path.join(this.tempPath,"./OEBPS/content.opf");
        this.content = [];
    }

    /**
     * 初始化目录
     */
    private copy(){
        return new Promise((ok)=>{
            cmd.get(
                `
                    mkdir ${this.outPath} && 
                    mkdir ${this.tempPath} && 
                    cd ${this.copyPath} && 
                    cp -rf ./ ${this.tempPath}
                 `,
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
                contentSlice: con.content.slice(0,20),
                id:i
            })
        }
        let contentOpf = ejs.render(fs.readFileSync(this.contentPath, 'utf-8'), {
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

    }
    /**
     * 处理图片
     */
    private image(){

    }
    /**
     * 处理封面
     */
    private cover(){

    }
    /**
     * 打包成epub
     */
    // private static generate(name){
    //     let outPath = path.join(__dirname,"../../run/out/"+name);
    //     let articles = fs.readdirSync('./out/OEBPS/Text');
    //     for(let i = 0; i < articles.length; i++)
    //     {
    //         let fname = articles[i];
    //         zip.file('OEBPS/Text/' + fname, fs.readFileSync('./out/OEBPS/Text/' + fname));
    //     }
    //
    //     let images = fs.readdirSync('./out/OEBPS/Images');
    //     for(let i = 0; i < images.length; i++)
    //     {
    //         let fname = images[i];
    //         zip.file('OEBPS/Images/' + fname, fs.readFileSync('./out/OEBPS/Images/' + fname));
    //     }
    // }

    /**
     * 打包成epub
     * @param name
     */
    private async zipCmd(){

        return new Promise((ok)=>{
            cmd.get(
                `
                    cd ${this.tempPath} &&
                    ls &&
                    zip -0Xq  ${this.outPath}.epub mimetype && zip -Xr9Dq ${this.outPath}.epub *
                 `,
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
