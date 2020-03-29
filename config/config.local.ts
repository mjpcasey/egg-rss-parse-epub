import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    lowdb:{
      path:'run/',
      app:true,
      agent:true
    },
    'rssParser':{
      timeout: 10000,
      app:true,
      agent:true
    }
  };

  return config;
};
