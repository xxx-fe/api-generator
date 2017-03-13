/*
 *@fileOverview it 招聘信息  互联网招聘 详情页面
 *@auth subying
*/
const it  = require('../../../spider/lagou.com/index');

module.exports = async function(ctx){
    const params = ctx.params;
    const data = await it.getDetail(params.id);

    ctx.body = data;
};
