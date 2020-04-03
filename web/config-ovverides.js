const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
/**
 * 导入ant
 * @param config
 * @param env
 * @returns {*}
 */
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#9F35FF" },
    })(config, env);
    return config;
};
