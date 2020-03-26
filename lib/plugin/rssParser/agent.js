const create = require('./lib/create');

module.exports = agent => {
    if (agent.config.rssParser.agent) {
        // app.addSingleton('lowdb', create);
        create(agent)
    }
};
