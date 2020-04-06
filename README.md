# egg-rss-epub
ts+egg+rss+cmd+ejs+react+ant

## QuickStart

### Development

```bash
$ npm run init
$ npm run dev
$ npm run devweb
$ open http://localhost:7001/
```
### Requirement

- Node.js 8.x
- Typescript 2.8+

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
   - js制作epub ： [教程](https://www.ibm.com/developerworks/cn/xml/tutorials/x-epubtut/index.html)
        - 打包zip, ncx,opf,css,xml,mimetype等文件
- [x] 搭建lowdb
> 接口
- [] 在线阅读 epub 渲染到html里面可以阅读，或者发到邮件里去
- [] 添加rss链接模块
- [] 查看下载epub
- [] graphql 搭建 [graphql](https://zhuanlan.zhihu.com/p/56516614)

### graphql 
```
├── graphql                       | graphql 代码
│   ├── common                    | 通用类型定义
│   │   ├── resolver.js           | 合并所有全局类型定义
│   │   ├── scalars               | 自定义类型定义
│   │   │   └── date.js           | 日期类型实现
│   │   └── schema.graphql        | schema 定义
│   ├── mutation                  | 所有的更新
│   │   └── schema.graphql        | schema 定义
│   ├── query                     | 所有的查询
│   │   └── schema.graphql        | schema 定义
│   └── user                      | 用户业务
│       ├── connector.js          | 连接数据服务
│       ├── resolver.js           | 类型实现
│       └── schema.graphql        | schema 定义
```


### 选型：
- 前端：react + react-router + graphql(集成 Apollo) + ant + axios
- 后端：egg.js + graphql
- 数据库：lowdb
- docker , ks8部署


### apollo
    yarn add apollo-boost react-apollo graphql
    https://tech.glowing.com/cn/add-graphql-to-react-with-apollo/
    apollo-boost 包含了下面这些 packages
    apollo-client：Apollo 的所有操作都从这里开始，提供了丰富的 API
    apollo-cache-inmemory: Apollo 提供的 Cache
    apollo-link-http: Apollo 用来和 Server 端通信
    apollo-link-error: Apollo Client 内部错误处理
    apollo-link-state: 本地状态管理
    graphql-tag: 提供 gql 方法，方便定义 queries 和 mutations
    react-apollo: 连接 Apollo 和 React 的 UI 组件
    graphql: 分析和检查我们写的 query string

