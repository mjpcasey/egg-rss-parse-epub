import { EggPlugin } from 'egg';
import * as path from 'path';
const plugin: EggPlugin = {
    lowdb:{
        enable: true,
        path: path.join(__dirname, '../lib/plugin/lowdb'),
    },
    "rssParser":{
        enable:true,
        path: path.join(__dirname, '../lib/plugin/rssParser'),
    },
    "graphql":{
        enable: true,
        package: 'egg-graphql'
    }
};

export default plugin;
