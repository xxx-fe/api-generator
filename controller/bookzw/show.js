/*
 *@fileOverview 小说详情页
 *@auth lijiliang
*/
const api  = require('../../spider/37zw.com/index');
module.exports = async function(ctx){
    const _id = ctx.params.id;
    const _aid = ctx.params.aid;
    const _sid = ctx.params.sid;
    const data = await api.getShow(_id, _aid, _sid);
    ctx.body = data;
};
