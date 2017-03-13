/*
 *@fileOverview it软件资讯详情
 *@auth subying
*/
const it  = require('../../../spider/oschina.net/projectNews');

module.exports = async function(ctx){
    const data = await it.getDetail(ctx.params);

    ctx.body = data;
};
