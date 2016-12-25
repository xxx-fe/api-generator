/**
 * @fileOverview 互联网招聘信息  lagou.com
*/
const cheerio = require('cheerio');
//const Iconv   = require('iconv-lite');//处理中文编码
//const _       = require('lodash');

const tool    = require('../../libs/tool');
const siteUrl = 'https://www.lagou.com';


/**
 * @description 抓取详情\
 * @param {Nunber} page 页码
 * @returns {Object}
*/
exports.getList = async (page) => {
    let content = '';
    const _page = page || 1;
    const _arr = [];

    content = await tool.getHttpContent(`${siteUrl}/guangzhou-zhaopin/${_page}/`);

    const $ = cheerio.load(content);
    const list = $('#s_position_list .item_con_list li');

    list.map((index,obj) => {
        const $elem = $(obj);
        const _id = $elem.attr('data-positionid');
        const _name = $elem.attr('data-positionname');
        const _salary = $elem.attr('data-salary');

        const $label = $elem.find('.list_item_bot .li_b_l span');
        const labels = [];
        $label.map((index,_el) => {
            return labels.push($(_el).text());
        });

        const $company = $elem.find('.company');
        const info = $elem.find('.position .li_b_l').text().replace(/\n/g,'').replace(_salary,'');
        const infoArr = info.split('/');

        _arr.push({
            id: _id,
            name: _name,
            salary: _salary,
            date: $elem.find('.format-time').text(),
            exp: infoArr[0],
            edu: infoArr[1],
            label: labels.join(','),
            company: {
                name: $company.find('a').text(),
                industry: $company.find('.industry').text().replace(/\n/g,''),
                advantage: $elem.find('.list_item_bot .li_b_r').text(),
                logo: $elem.find('.com_logo img').attr('src')
            }
        });

        return true;
    });

    return JSON.stringify({
        code:0,
        data: _arr
    });
};
