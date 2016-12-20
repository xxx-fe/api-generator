/*
 *@fileOverview 首页
 *@auth subying
*/
const articlePad  = require('../db/article');

module.exports = async function(ctx){
    //await articlePad.add('测试','test con'); //新增
    //await articlePad.update(6,{title:'test123',content:'tt-text'}); //修改
    //await articlePad.delete(5); // 删除

    var list = await articlePad.getList();

    //ctx.body = list;
    ctx.render({list:list},'index');
};
