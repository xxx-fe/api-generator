/*
 *@fileOverview 文章操作
 *@auth subying
*/

const dbCtrl = require('./ctrl');//数据库操作

var dbPad = {
    /*
     *@description 新增内容
    */
    add:async function(title,content){
        var db = new dbCtrl();
        var sql = 'insert into article (article_title,article_content,update_time) values($title,$content,datetime("now","localtime"))';
        await db.run(sql,{$title:title,$content:content});
        db.close();
    },
    /*
     *@description 获取数据
     *@param {Number} id 文章id
    */
    getData:async function(id){
        if(!id) return false;

        var db = new dbCtrl();
        var sql = 'select * from article where article_id='+id;

        var rows = await db.get(sql);
        db.close();

        return rows;
    },
    /*
     *@description 获取列表
    */
    getList:async function(){
        var db = new dbCtrl();
        var sql = 'select article_id,article_title,update_time from article';

        var rows = await db.all(sql);
        db.close();

        return rows;
    },
    /*
     *@description 更新
     *@param {Number} id 文章id
     *@param {Object} id 更新的内容、标题 {title:'xxx',content:'xxx'} {title:'xxx'}
    */
    update:async function(id,obj){
        if(!id || !obj) return false;
        var db = new dbCtrl();
        var sql='update article set update_time=datetime("now","localtime"),';

        //判断标题
        if(obj.title){
            sql += 'article_title=?';
        }

        //判断内容
        if(obj.content){
            sql += ',article_content=? ';
        }

        sql += 'where article_id='+id;
        await db.run(sql,[obj.title,obj.content]);
        db.close();
    },
    /*
     *@description 获取数据
     *@param {Number} id 文章id
    */
    delete:async function(id){
        if(!id) return false;

        var db = new dbCtrl();
        var sql = 'delete from article where article_id='+id;

        await db.run(sql);
        db.close();
    }
};


module.exports = dbPad;
