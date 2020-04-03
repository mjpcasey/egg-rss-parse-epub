// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRss from '../../../app/controller/rss';

declare module 'egg' {
  interface IController {
    rss: ExportRss;
  }
}
