import React from 'react';

/**
 * 导出组件
 * 通过React的lazy组件实现代码分割组件,注释为分割的模块名, 同一个模块名打包最终会被打包到一起
 */
/**
 * 首页
 */
export const Home = React.lazy(() => import('../pages/Home'));
export const rssAdd = React.lazy(() => import('../pages/rss/add'));
export const rssList = React.lazy(() => import('../pages/rss/list'));

/**
 *路由配置
 */
export const ROUTES = [
    {
        key: 'rssAdd',
        link: '/home/rssAdd',
        iconType: 'icon-tuichu',
        text: 'rssAdd',
        component: rssAdd,
    },
    {
        key: 'rssList',
        link: '/home/rssList',
        iconType: 'icon-twitter',
        text: 'rssList',
        component: rssList,
    }
];
