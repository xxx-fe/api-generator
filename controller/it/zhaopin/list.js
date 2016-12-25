/*
 *@fileOverview it 招聘信息  互联网招聘
 *@auth subying
*/
const book  = require('../../../spider/lagou.com/index');

module.exports = async function(ctx){
    const params = ctx.params;

    const data = await book.getList(params.page);

    ctx.body = data;
};
