/*
 *@fileOverview 抓取 http://m.37zw.com/ 频道分类
 *@auth lijiliang
*/
const cheerio = require('cheerio');
const Iconv   = require('iconv-lite');
const _       = require('lodash');

const tool    = require('../../libs/tool');
const webSite = 'http://m.37zw.com';

/**
 *  @description 统一获取网页内容
 * @param  {[string]}  key []
 * @returns {Object}
 */
exports.getWebContent = async (key) => {
    const _url = webSite + key;
    let content = '';
    content = await tool.getHttpContent(_url);
    content = Iconv.decode(content, 'gb2312');
    return content;
};

/**
 * @description 抓取频道分类
 * @returns {Object}
*/
exports.getCatalog = async () => {
    const body = await exports.getWebContent('/sort/');
    const $ = cheerio.load(body);
    const _list = [];
    // const _url = webSite + '/sort/';
    // let content = '';
    // content = await tool.getHttpContent(_url);
    // content = Iconv.decode(content, 'gb2312');
    // const $ = cheerio.load(content);
    const listCnt = $('.content li').find('a');
    listCnt.map((index, obj) => {
        const $elem = $(obj);
        let _href = null;
        let _match = [];
        if(index>=0){
            _href = $elem.attr('href');
            _match = _href.match(/(\d+)/);
            _list.push({
                id: _match[0],
                text: $elem.text()
            });
        }
        return true;
    });
    return JSON.stringify({
        code: 0,
        data: _list
    });
};

/**
 * @description 抓取分类列表
 * @param  {[string]}  id   [分类ID]
 * @param  {[string]}  page [当前分页]
 * @returns {Object}
 */
exports.getList = async (id,page) => {
    const _list = [];
    const _url = webSite + '/sort/' + id + '_' + page + '/';
    let content = '';
    content = await tool.getHttpContent(_url);
    content = Iconv.decode(content, 'gb2312');
    const $ = cheerio.load(content);

    const listCnt = $('.cover').find('p');
    listCnt.map((index, obj) => {
        const $elem = $(obj);
        let _match = [];
        let _type = $elem.find('a').eq(0).text();
        // _type = _type.replace(/(\[|\])/g, '');
        _type = _type.replace(/^\[|\\]$/g, '');
        const _name = $elem.find('a').eq(1).text();
        const _href = $elem.find('a').eq(1).attr('href');
        let _author = $elem.text();
        const reg = /\/([\s\S]*)/;   // 匹配 \ 后面的内容
        _match = _href.match(/(\d+)/g);
        _author = reg.exec(_author)[1];
        _list.push({
            type: _type,
            name: _name,
            sid: _match[0],     //
            listId: _match[1],   // 小说列表ID
            author: _author,
        });
        return true;
    });

    //分页信息
    let _pageCnt = $('.page').eq(1).text();
    _pageCnt = _pageCnt.match(/(\d+)/g);
    return JSON.stringify({
        code: 0,
        curpage: _pageCnt[0],
        total: _pageCnt[1],
        pageSize: _pageCnt[2],
        data: _list
    });
};

/**
 * @description 抓取小说目录
 * @param  {[string]}  id   [分类ID]
 * @param  {[string]}  sid [小说id]
 * @returns {Object}
 */
exports.getDir = async (id,sid) => {
    const _list = [];
    const _url = webSite + '/' + id + '/' + sid + '/';
    let content = '';
    content = await tool.getHttpContent(_url);
    content = Iconv.decode(content, 'gb2312');
    const $ = cheerio.load(content);

    const listCnt = $('.chapter').find('li');
    listCnt.map((index, obj) => {
        const $elem = $(obj);
        let _match = [];
        const _href = $elem.find('a').attr('href');
        _match = _href.match(/(\d+)/g);
        _list.push({
            name: $elem.find('a').text(),
            id: _match[0],
            sid: _match[1],
            aid: _match[2]
        });
        return true;
    });
    return JSON.stringify({
        code: 0,
        data: {
            info: {
                thumb: $('.block_img2').find('img').attr('src'),
                name: $('.block_txt2 h2').text(),
                introInfo: $('.intro_info').text(),
                author: $('.block_txt2').find('p').eq(1).text(),
                sorts:  $('.block_txt2').find('p').eq(2).text(),
                start: $('.block_txt2').find('p').eq(3).text(),
                update: $('.block_txt2').find('p').eq(4).text(),
                newest: $('.block_txt2').find('p').eq(5).text(),
            },
            list: _list
        }
    });
};

/*
 * @description 抓取小说正文
 * @param  {[string]}  id   [分类ID]
 * @param  {[string]}  aid [小说id]
 * @param  {[string]}  sid [文章id]
 * @returns {Object}
 */
exports.getShow = async (id,aid,sid) => {
    const _url = webSite + '/' + id + '/' + aid + '/' + sid + '.html';
    let content = '';
    const reg = /\r\n/g;
    content = await tool.getHttpContent(_url);
    content = Iconv.decode(content, 'gb2312');
    const $ = cheerio.load(content);
    return JSON.stringify({
        code: 0,
        data: {
            title: $('#nr_title').text().replace(reg, ''),
            content: $('#nr1').text()
        }
    });
};
