/**
 * @fileOverview tool 工具类
 * @auth subying
*/
const request       = require('request');
//const BufferHelper  = require('bufferhelper');
const _             = require('lodash');
const requestJar    = request.defaults({jar: true});


/**
 * @description get请求
 * @param {string} url 请求的链接
 * @param {Object} headers 请求头部
 * @param {Function} callback 成功回调
 * @param {Function} errback 失败回调
 * @returns {Voild}
*/
exports.getUrl = function(url,headers,callback,errback){
    const option = {
        method: 'GET',
        url: url,
        headers:{
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
        },
        encoding: null
    };

    if(headers && _.isObject(headers)){
        option.headers = headers;
    }

    requestJar(option,(error,reponse,body) => {
        if(error){
            errback(error);
        }else{
            callback(body);
        }
    });
};


/**
 * @description post请求
 * @param {string} url 请求的链接
 * @param {Object} data 请求头部
 * @param {Object} headers 请求头部
 * @param {Function} callback 成功回调
 * @param {Function} errback 失败回调
 * @returns {Voild}
*/
exports.postUrl = function(url,data,headers,callback,errback){
    const option = {
        method: 'POST',
        form: data,
        url: url,
        headers:{
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
        },
        encoding: null
    };

    if(headers && _.isObject(headers)){
        option.headers = headers;
    }

    requestJar(option,(error,reponse,body) => {
        if(error){
            errback(error);
        }else{
            callback(body);
        }
    });
};


/**
 * @description get请求
 * @param {string} url 请求的链接
 * @param {Object} headers 请求头部
 * @returns {Voild}
*/
exports.getHttpContent = function(url,headers){
    return new Promise(function(resolve, reject) {
        exports.getUrl(url, headers,function(content) {
            resolve(content);
        }, function(err) {
            console.log('getHttpErr='+err,url);
            reject(err);
        });
    });
};

/**
 * @description post请求
 * @param {string} url 请求的链接
 * @param {Object} data post 数据
 * @param {Object} headers 请求头部
 * @returns {Voild}
*/
exports.postHttpContent = function(url,data,headers){
    return new Promise(function(resolve, reject) {
        exports.postUrl(url,data, headers,function(content) {
            resolve(content);
        }, function(err) {
            console.log('postHttpErr='+err,url);
            reject(err);
        });
    });
};
