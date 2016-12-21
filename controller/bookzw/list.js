/*
 *@fileOverview 分类列表
 *@auth lijiliang
*/
const api  = require('../../spider/37zw.com/index');
module.exports = async function(ctx){
    const _id = ctx.params.id;
    const _page = ctx.params.page;

    const data = await api.getList(_id, _page);

    ctx.body = 'asf';
};
