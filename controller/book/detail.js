/*
 *@fileOverview 某分类下的列表
 *@auth subying
*/
const book  = require('../../spider/woqudu.net/index');

module.exports = async function(ctx){
    const data = await book.getDetail(ctx.params);

    ctx.body = data;
};
