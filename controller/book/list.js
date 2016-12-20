/*
 *@fileOverview 某小说的目录
 *@auth subying
*/
const book  = require('../../spider/woqudu.net/index');

module.exports = async function(ctx){
    const data = await book.getList(ctx.params);

    ctx.body = data;
};
