/**
 * @fileOverview 小说抓取 woqudu.net
*/
const cheerio = require('cheerio');
const Iconv   = require('iconv-lite');//处理中文编码
const _       = require('lodash');

const tool    = require('../../libs/tool');
const siteUrl = 'http://www.woqudu.net/';


/**
 * @description 抓取首页分类
 * @returns {Object}
*/
exports.getCatalog = async () => {
    const _arr = [];
    let content = '';

    content = await tool.getHttpContent(siteUrl);
    content = Iconv.decode(content,'gb2312');
    const $ = cheerio.load(content);
    const list = $('table tr').eq(4).find('a');

    list.map((index,obj) => {
        const $elem = $(obj);
        let _match = [];
        let _href = null;
        if(index>0){
            _href = $elem.attr('href');
            //_match = _href.match(/class=(\d+)/);
            _match = _href.match(/\/catalog\/(\d+)\.html/);
            _arr.push({
                id: _match[1],
                text: $elem.text().replace('\n\t\t','')
            });
        }
        return true;
    });

    return JSON.stringify({
        code:0,
        data: _arr
    });
};


/**
 * @description 抓取某分类的列表
 * @param {Object} params url参数
 * @returns {Object}
*/
exports.getList = async (params) => {
    const _page = params.page || 1;
    const _arr=[];
    let title='';

    const _url = siteUrl+'modules/article/articlelist.php?class='+params.id+'&page='+_page;

    const content = await tool.getHttpContent(_url,{});
    const $ = cheerio.load(Iconv.decode(content,'gb2312'));

    title = $('title').text().split('-')[0];
    const list = $('.newborder .font14');
    list.map((index,obj) => {
        const $elem = $(obj);
        const _href = $elem.attr('href');
        const _match = _href.match(/\/book\/(\d+)\.html/);

        _arr.push({
            id: _match[1],
            text: $elem.text()
        });
        return true;
    });

    return JSON.stringify({
        code:0,
        data: _arr,
        title: title
    });
};


/**
 * @description 抓取某小说的目录
 * @param {Object} params url参数
 * @returns {Object}
*/
exports.getDir = async (params) => {
    const _id = params.id+'';
    const sid = _id.slice(0,_id.length>4?2:1);
    let _arr = [];


    const _upath = sid+'/'+params.id;
    const _url = siteUrl+'files/article/html/'+ _upath +'/index.html';

    const content = await tool.getHttpContent(_url,{});
    const $ = cheerio.load(Iconv.decode(content,'gb2312'));

    const title = $('title').text().split('-')[0];
    const list = $('table.acss .ccss a');
    list.map((index,obj) => {
        const $elem = $(obj);
        const _href = $elem.attr('href');
        if(_href){
            const page = _href.replace(/\.htm[l]?/g,'');
            _arr.push({
                text: $elem.text(),
                id: _id,
                sid: sid,
                pageId: parseInt(page,10)
            });
        }
        return true;
    });

    _arr = _.sortBy(_arr,'page');

    return JSON.stringify({
        code:0,
        data: _arr,
        title: title
    });
};


/**
 * @description 抓取某章节内容
 * @param {Object} params url参数
 * @returns {Object}
*/
exports.getDetail = async (params) => {
    let title  = '';

    const _upath = params.sid+'/'+params.id+'/'+params.pageId;
    const _url = siteUrl+'files/article/html/'+ _upath +'.html';

    const content = await tool.getHttpContent(_url,{});
    const $ = cheerio.load(Iconv.decode(content,'gb2312'));

    title = $('title').text().split('-我去读文学网')[0];
    const conElem = $('#content');
    const con = conElem.text();

    return JSON.stringify({
        code:0,
        data: con,
        title: title
    });
};
