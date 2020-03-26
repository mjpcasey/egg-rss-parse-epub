const create = require('./lib/create');
module.exports = app => {
    if (app.config.rssParser.app) {
        // app.addSingleton('lowdb', create);
        create(app)
    }
};
