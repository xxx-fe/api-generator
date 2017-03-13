/**
 * @fileOverview 互联网招聘信息  lagou.com
*/
const cheerio = require('cheerio');
//const Iconv   = require('iconv-lite');//处理中文编码
//const _       = require('lodash');

const tool    = require('../../libs/tool');
const siteUrl = 'https://www.lagou.com';


/**
 * @description 抓取列表
 * @param {string} city 城市拼音
 * @param {Nunber} page 页码
 * @returns {Object}
*/
exports.getList = async (city,page) => {
    let content = '';
    const _page = page || 1;
    const _city = city || 'guangzhou';
    const _arr = [];
    content = await tool.getHttpContent(`${siteUrl}/${_city}-zhaopin/${_page}/`);

    const $ = cheerio.load(content);
    const list = $('#s_position_list .item_con_list li');

    list.map((index,obj) => {
        const $elem = $(obj);
        const _id = $elem.attr('data-positionid');
        const _name = $elem.attr('data-positionname');
        const _salary = $elem.attr('data-salary');

        const $label = $elem.find('.list_item_bot .li_b_l span');
        const labels = [];
        $label.map((_index,_el) => {
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

/**
 * @description 抓取详情页面
 * @param {Nunber} id id
 * @returns {Object}
*/
exports.getDetail = async (id) => {
    let content = '';
    const _job = {};
    content = await tool.getHttpContent(`${siteUrl}/jobs/${id}.html`);

    const $ = cheerio.load(content);
    const jobInfo = $('.position-content  .position-content-l');
    const labelsArr = []; //职位标签
    const jobLabels = []; //工作标签
    jobInfo.find('.labels').map((index,item) => {
        labelsArr.push($(item).text());
        return $(item).text();
    });

    jobInfo.find('.job_request p span').map((index,item) => {
        jobLabels.push($(item).text().replace(/\//g,''));
        return $(item).text();
    });

    _job.info={
        company: jobInfo.find('.company').text(), //职位招聘公司或部门
        name: jobInfo.find('.name').text(), //职位名称
        request: jobLabels, //需求标签
        lables: labelsArr, //职位标签
        publish_time: jobInfo.find('.publish_time').text()
    };
    _job.advantage = $('.job-advantage p').text(); //职位诱惑
    _job.description = $('.job_bt>div').text(); //职位描述
    _job.address = $('.work_addr').text().replace(/\\|\n|\s/g,'').replace('查看地图',''); //工作地点

    //公司信息
    const companyInfo = $('#job_company');
    const companyInfoLabels = companyInfo.find('.c_feature');
    _job.company={
        logo: companyInfo.find('img').attr('src'),//公司logo
        name: companyInfo.find('img').attr('alt'),//公司名称
        fourSquare: companyInfoLabels.find('li').eq(0).text().replace(/\\|\n|\s/g,'')
        .replace('领域',''), //领域
        trend: companyInfoLabels.find('li').eq(1).text().replace(/\\|\n|\s/g,'')
        .replace('发展阶段',''), //发展阶段
        figure: companyInfoLabels.find('li').eq(2).text().replace(/\\|\n|\s/g,'')
        .replace('规模',''), //规模
        home: companyInfoLabels.find('li').eq(3).find('a').text() //公司网址
    };

    return JSON.stringify({
        code:0,
        data: _job
    });
};
