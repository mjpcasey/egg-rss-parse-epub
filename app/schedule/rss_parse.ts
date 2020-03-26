// const Subscription = require('egg').Subscription;
//
// class UpdateCache extends Subscription {
//     // 通过 schedule 属性来设置定时任务的执行间隔等配置
//     static get schedule() {
//         return {
//             interval: '1m', // 1 分钟间隔
//             type: 'all', // 指定所有的 worker 都需要执行
//             immediate: true, //项目启动就执行一次定时任务
//             env: ["dev", "debug"] //该定时任务在开发环境和debug模式下才执行
//         };
//     }
//
//     // subscribe 是真正定时任务执行时被运行的函数
//     async subscribe() {
//         console.log(111111111);
//         const res = await this.ctx.curl('http://www.api.com/cache', {
//             dataType: 'json',
//         });
//
//         this.ctx.app.cache = res.data;
//     }
// }
//
// module.exports = UpdateCache;

module.exports = {
    schedule: {
        interval: '1m', // 120 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
        immediate: false, //项目启动就执行一次定时任务
    },
    async task(ctx) {
        // 查看rss表
        let rssArray:any = await ctx.service.rss.rss_parse();
        // 判断更新时间
        await ctx.service.rss.rss_write(rssArray);
        // console.log(JSON.stringify(rssArray))
        // 转成equb

        // 订阅邮件发送
        return rssArray;
    },
};
