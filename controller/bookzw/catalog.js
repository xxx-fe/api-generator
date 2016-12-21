/*
 *@fileOverview 频道分类
 *@auth lijiliang
*/
const api  = require('../../spider/37zw.com/index');

module.exports = async function(ctx){
    const data = await api.getCatalog();
    ctx.body = data;
};
