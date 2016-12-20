/*
 *@fileOverview 404 页面
 *@auth subying
*/

module.exports = async function(ctx){
    ctx.status = 404;
    ctx.body = '404';
};
