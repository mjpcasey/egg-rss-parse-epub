# egg-rss-epub
ts+egg+rss+cmd+ejs+react+ant

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### 开始
npm init egg --type=ts

### 功能
#### 添加链接的模块
1. 前端可以添加博客链接
2. 前端检查是否存在博客链可订阅rss
3. 配置定时发送邮件的时间，默认每天
4. 可选设置封面
5. 可选配置定时删除几天前的
6. 解析 rss
7. 解析 小说
8. 解析 文章
#### 定时任务查看模块
1. 看每天的解析情况
2. 可下载相应的书籍
3. 可在线阅读
#### 后台：
> 定时任务
- [x] 根据列表定时检查链接，查看博客是否更新（diff语法）
- [x] 解析rss
-  定时生产书籍
   - js制作epub ： [](https://www.ibm.com/developerworks/cn/xml/tutorials/x-epubtut/index.html)
        - 打包zip, ncx,opf,css,xml,mimetype等文件
- [x] 搭建lowdb
> 接口
- [] 在线阅读 epub 渲染到html里面可以阅读，或者发到邮件里去
- [] 添加rss链接模块
- [] 查看下载eoub
### 选型：
- 前端：next.js 或者 react+ant
- 后端：egg.js
- 流量： nginx
- 数据库：lowdb
- docker , ks8部署

