import { Application, IBoot } from 'egg';
const next = require('next');
const withSass = require('@zeit/next-sass');
const nextApp = next({
    dev:true,
    ...withSass()
})
export default class FooBoot implements IBoot {
    private readonly app: Application;
    constructor(app: Application) {
        this.app = app;
    }
    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }
    configDidLoad() {
        // Config, plugin files have loaded.
    }
    async didLoad() {
        // All files have loaded, start plugin here.
    }
    async willReady() {
        // All plugins have started, can do some thing before app ready.
    }
    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
        // await this.app.init();
        // this.app.lowdb.model('user').add({name:'mjp'});
        await this.app.runSchedule('rss_parse');
    }
    async serverDidReady() {
        // Server is listening.
    }
    async beforeClose() {
        // Do some thing before app close.
    }
}
