/*
 *@fileOverview it软件资讯
 *@auth subying
*/
const it  = require('../../../spider/oschina.net/projectNews');

module.exports = async function(ctx){
    const data = await it.getList(ctx.params);

    ctx.body = data;
};
