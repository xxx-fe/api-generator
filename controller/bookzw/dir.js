/*
 *@fileOverview 小说目录
 *@auth lijiliang
*/
const api  = require('../../spider/37zw.com/index');
module.exports = async function(ctx){
    const _id = ctx.params.id;
    const _sid = ctx.params.sid;
    const data = await api.getDir(_id, _sid);
    ctx.body = data;
};
