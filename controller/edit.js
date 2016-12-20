/*
 *@fileOverview 编辑
 *@auth subying
*/
const articlePad  = require('../db/article');

module.exports = async function(ctx){

    if(ctx.method == 'GET'){
        var data = {
            article_id:'',
            article_title:'',
            article_content:''
        };

        if(ctx.params.id){
            data = await articlePad.getData(ctx.params.id);
        }

        console.log(ctx.params);
        ctx.render(data,'edit');
    }else{
        var body = ctx.request.body;
        var _json = {code:'00000',msg:'ok'};
        var res;
        if(body.id){
            res = await articlePad.update(body.id,{title:body.title,content:body.content});
        }else{
            res = await articlePad.add(body.title,body.content);
        }

        if(res){//如果失败
            _json = {code:'10001',msg:'fail'};
        }
        ctx.body = _json;
    }

};
