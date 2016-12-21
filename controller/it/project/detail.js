/*
 *@fileOverview it软件资讯详情
 *@auth subying
*/
const book  = require('../../../spider/oschina.net/projectNews');

module.exports = async function(ctx){
    const data = await book.getDetail(ctx.params);

    ctx.body = data;
};
