let Parser = require('rss-parser');
let Caches = null;
module.exports = function (app) {
    if (Caches) {
        return Caches;
    }
    if(app.config.rssParser){
        app.logger.info(`[rss-parser] start in ${JSON.stringify(app.config.rssParser)}`)
    }
    let parser = new Parser(app.config.rssParser || {});
    app.rssParser = parser;
    return Caches = parser;
};
