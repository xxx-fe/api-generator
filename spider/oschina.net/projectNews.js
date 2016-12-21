/**
 * @fileOverview 软件资讯抓取  oschina.net
*/
const cheerio = require('cheerio');
//const Iconv   = require('iconv-lite');//处理中文编码
//const _       = require('lodash');

const tool    = require('../../libs/tool');
const siteUrl = 'http://www.oschina.net/';


/**
 * @description 抓取列表
 * @param {Object} params url参数
 * @returns {Object}
*/
exports.getList = async (params) => {
    const _arr = [];
    let content = '';
    const page = params.page || 1;

    content = await tool.getHttpContent(siteUrl+'action/ajax/get_more_news_list?newsType=project&p='+page);
    const $ = cheerio.load(content);
    const list = $('.item.box');

    list.map((index,obj) => {
        const $elem = $(obj);
        const _hrefElem = $elem.find('a.title');
        const _descElem = $elem.find('div.sc-text');
        const infoElem = $elem.find('.from span').eq(0);
        let infoText = infoElem.text().replace(/\r\n/g,'').replace('发布于','');
        infoText = infoText.trim();
        const infoArr = infoText.split('  ');

        //标题
        const _title = _hrefElem.text();

        //分割  获取id name
        let _href = _hrefElem.attr('href');
        _href = _href.replace('/news/','');
        const _hrefArr = _href.split('/');

        _href = $elem.attr('href');
        _arr.push({
            id: _hrefArr[0],
            name: _hrefArr[1],
            title: _title,
            author: infoArr[0],
            date: infoArr[1],
            description: _descElem.text()
        });

        return true;
    });

    return JSON.stringify({
        code:0,
        data: _arr
    });
};


/**
 * @description 抓取详情
 * @param {Object} params url参数
 * @returns {Object}
*/
exports.getDetail = async (params) => {
    let content = '';
    const id = params.id;
    const name = params.name;

    content = await tool.getHttpContent(`${siteUrl}news/${id}/${name}`);
    const $ = cheerio.load(content);
    const conElem = $('.editor-viewer');
    const conElemFP = conElem.find('p').eq(0);
    conElemFP.remove();

    const con = conElem.text();
    const title = $('title').text();
    const infoElem = $('.from');

    return JSON.stringify({
        code:0,
        data: {
            title: title,
            author: infoElem.find('a').eq(1).text(),
            date: infoElem.find('span').eq(0).text().replace('发布于',''),
            content: con
        }
    });
};
