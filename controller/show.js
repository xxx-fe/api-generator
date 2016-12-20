/*
 *@fileOverview 显示
 *@auth subying
*/
const articlePad  = require('../db/article');

module.exports = async function(ctx){
    const data = await articlePad.getData(ctx.params.id);

    ctx.render(data,'show');
};
