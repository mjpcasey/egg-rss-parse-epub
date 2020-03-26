# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

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
1.前端可以添加博客链接
2.前端检查是否存在博客链可订阅rss
3.配置定时发送邮件的时间，默认每天
4.可选设置封面
5.可选配置定时删除几天前的
#### 定时任务查看模块
1.看每天的解析情况
2.可下载相应的书籍
3.可在线阅读
#### 后台：
定时任务
1. 根据列表定时检查链接，查看博客是否更新（diff语法）
2. 解析rss
3. 定时生产书籍
4. 搭建lowdb 

### 选型：
- 前端：next.js（react）, 部署docker
- 后端：egg.js, 部署docker
   - 解析rss-parse    
- 流量： nginx
- 数据库：lowdb

