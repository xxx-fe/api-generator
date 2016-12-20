/**
 * @fileOverview 小说抓取 woqudu.net
*/
const cheerio = require('cheerio');
const Iconv   = require('iconv-lite');//处理中文编码
//const _       = require('lodash');

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
