/*
 *@fileOverview 路由定义
 *@auth subying
*/
const path        = require('path');
const fs          = require('fs');

const KoaRouter   = require('koa-router');
const router      = new KoaRouter();
const log4js      = require('log4js');
const logger      = log4js.getLogger('router');

const setting     = require('./setting');
const _cpath      = '../'+ setting.path.controller +'/';


const routersPad = {
    init: function(){
        // //首页
        // router.get('/',async (ctx,next) => {
        //     //
        //     await this.bindController('index',ctx,next);
        // });
        // //显示
        // router.get('/show/:id',async (ctx,next) => {
        //     //
        //     await this.bindController('show',ctx,next);
        // });
        // //编辑
        // router.get('/edit/:id',async (ctx,next) => {
        //     //
        //     await this.bindController('edit',ctx,next);
        // });
        // //新增
        // router.get('/edit',async (ctx,next) => {
        //     //
        //     await this.bindController('edit',ctx,next);
        // });
        // //保存
        // router.post('/edit',async (ctx,next) => {
        //     //
        //     await this.bindController('edit',ctx,next);
        // });

        //api start
        router.get('/book/catalog',async (ctx,next) => {
            //
            await this.bindController('book/catalog',ctx,next);
        });
        router.get('/book/list/:id',async (ctx,next) => { //某分类列表
            //
            await this.bindController('book/list',ctx,next);
        });
        router.get('/book/list/:id/:page',async (ctx,next) => { //某分类列表-分页
            //
            await this.bindController('book/list',ctx,next);
        });
        router.get('/book/dir/:id',async (ctx,next) => { //某小说目录
            //
            await this.bindController('book/dir',ctx,next);
        });
        router.get('/book/detail/:sid/:id/:pageId',async (ctx,next) => { //某章节内容
            //
            await this.bindController('book/detail',ctx,next);
        });

        // 抓取 http://m.37zw.com/ api start
        router.get('/bookzw/catalog', async (ctx,next) => {
            await this.bindController('bookzw/catalog', ctx,next);
        });
        router.get('/bookzw/list/:id/:page', async (ctx,next) => {  // 分类列表
            await this.bindController('bookzw/list', ctx, next);
        });
        router.get('/bookzw/dir/:id/:aid', async (ctx,next) => {  // 小说目录
            await this.bindController('bookzw/dir', ctx, next);
        });
        router.get('/bookzw/show/:id/:aid/:sid', async (ctx, next) => { // 详情页
            await this.bindController('bookzw/show', ctx, next);
        });

        //it
        router.get('/it/project/list/:page',async (ctx,next) => { //某分类列表
            //
            await this.bindController('it/project/list',ctx,next);
        });
        router.get('/it/project/detail/:id/:name',async (ctx,next) => { //某分类列表
            //
            await this.bindController('it/project/detail',ctx,next);
        });
        router.get('/it/zhaopin/list/:page',async (ctx,next) => { //招聘列表
            //
            await this.bindController('it/zhaopin/list',ctx,next);
        });

        //api end

        //404页面
        router.get('/404',async (ctx,next) => {
            //
            await this.bindController('bad',ctx,next);
        });

        //没有设置控制器的页面
        router.get('*',async (ctx,next) => {
            await this.bindController('bad',ctx,next);
        });

        return router.routes();
    },

    bindController:async function(name,ctx){
        try{
            const controller = this.getContrller(name);
            await controller.bind(ctx)(ctx);
        }catch(e){ //打印错误 并跳转到404
            logger.error(ctx.url,JSON.stringify({
                get: ctx.request.query,
                post: ctx.request.body
            }),e.stack);

            ctx.redirect('/404');
        }
    },
    /*
     * @description 获取控制器
     */
    getContrller: (name) => {
        const _path = _cpath+name+'.js';

        //转换文件绝对路径
        const filePath = path.resolve(__dirname,_path);

        //判断文件是否存在
        if(fs.existsSync(filePath)){
            return require(_path);
        }else{
            throw Error('controller is not exists');
        }
    }
};

module.exports = routersPad;
