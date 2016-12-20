/*
 *@fileOverview 显示
 *@auth subying
*/
const articlePad  = require('../db/article');

module.exports = async function(ctx){
    var data = await articlePad.getData(ctx.params.id);

    ctx.render(data,'show');
};
