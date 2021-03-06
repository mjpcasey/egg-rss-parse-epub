const EventEmitter = require('events').EventEmitter;
const lowdb = require('lowdb');
const shortid = require('shortid')
const FileSync = require('lowdb/adapters/FileSync');  // 有多种适配器可选择

let dbProxy = module.exports = class extends EventEmitter {
    constructor(config) {
        super();
        this.config = config
    }
    model(name) {
        return new dbModel(name,this.config.path);
    }
};


class dbModel {
    constructor(name,path){
        let adapter = new FileSync(path + name +'.json');
        this.db = lowdb(adapter);
        if(!this.db.has('posts')
            .value()){
            this.db.defaults({posts: []}).write();
        }
    }
    add(obj){
        //实现自增ID
        return this.db.get('posts')
            .push({ id: shortid.generate(),...obj})
            .write()
            .id
    }
    findAndUpdate(query,set){
        return this.db.get('posts')
            .find(query)
            .assign(set)
            .write()
    }
    remove(query){
        return this.db.get('posts')
            .remove(query)
            .write()
        // db.unset('user.name')
        //     .write()
    }
    removeAll(){
        this.db.set('posts', [])
            .write()
        return this;
    }
    find(query,option= {sortBy:'id',limit:5}){
        return this.db.get('posts')
            .filter(query)
            .sortBy(option.sortBy)
            .take(option.limit)
            .value()
        // db.get('posts')
        //     .map('title')
        //     .value()
    }
    map(key){
        return this.db.get('posts')
            .map(key)
            .value()
    }
    findOne(query, option = {sortBy:'id',limit:1}){
        return this.db.get('posts')
            .filter(query)
            .sortBy(option.sortBy)
            .take(option.limit)
            .value()
    }
}
