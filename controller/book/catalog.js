/*
 *@fileOverview 分类
 *@auth subying
*/
const book  = require('../../spider/woqudu.net/index');

module.exports = async function(ctx){
    const data = await book.getCatalog();

    ctx.body = data;
};
