/*
 *@fileOverview 初始化数据
 *@auth subying
*/
const fs = require('fs');
const path = require('path');

const dbCtrl = require('./ctrl');//数据库操作
const setting = require('../libs/setting'); //设置
const _dbFile = path.join(__dirname,setting.db.file);


//创建 文章表 sql
// var articleSql = 'create table IF NOT EXISTS article(article_id integer PRIMARY KEY autoincrement,article_title varchar(50),article_content text,dir_id integer,user_id integer,create_time timestamp not null default (datetime('now','localtime')),update_time timestamp)';

var articleSql = 'create table IF NOT EXISTS article('
    + 'article_id integer PRIMARY KEY autoincrement,' // id
    + 'article_title varchar(50),' // 标题
    + 'article_content text,dir_id integer,' // 内容
    + 'user_id integer,' //
    + 'create_time timestamp not null default (datetime("now","localtime")),'//创建时间
    + 'update_time timestamp)';//更新时间;


var dbPad = {
    init: async function(){
        //如果不存在则  不需要手动创建数据库文件
        if(!fs.existsSync(_dbFile)){
            console.log('create');
            var db = new dbCtrl();
            await db.run(articleSql);//创建文章表
            db.close();
        }
    }
};

module.exports = dbPad;
