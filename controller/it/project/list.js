/*
 *@fileOverview it软件资讯
 *@auth subying
*/
const book  = require('../../../spider/oschina.net/projectNews');

module.exports = async function(ctx){
    const data = await book.getList(ctx.params);

    ctx.body = data;
};
