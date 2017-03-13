### 接口说明
##### 路由定义使用的是koa-router定义方式

#### 获取列表
 * url: /it/zhaopin/:city/:page
 * param: city 城市拼音
 * param: page 为第几页
 * method: GET  
 * returns:
```json
{
"code": 0,
"data": [
    {
        "id": "2802830",
        "name": "后台开发主管",
        "salary": "8k-13k",
        "date": "15:27发布",
        "exp": " 经验3-5年 ",
        "edu": " 本科 ",
        "label": "提成过万,专项奖金",
        "company": {
            "name": "魔豹技术",
            "industry": " 企业服务 / 成长型(A轮) ",
            "advantage": "“期权”",
            "logo": "//www.lgstatic.com/thumbnail_120x120/image1/M00/1A/C2/CgYXBlUdGWeAcgvyAABreX1kbuQ368.png"
        }
    }
]
}
```

#### 获取详情
 * url: /it/zhaopin/jobs/:id
 * param: id 列表返回的id
 * method: GET  
 * returns:
```json
{
"code": 0,
"data": {
    "info": {
        "company": "魔豹技术研发部招聘",
        "name": "后台开发主管",
        "request": [
            "8k-13k ",
            "广州 ",
            "经验3-5年 ",
            "本科及以上 ",
            "全职"
        ],
        "lables": [
            "高级",
            "后台",
            "项目经理"
        ],
        "publish_time": "15:27  发布于拉勾网"
    },
    "advantage": "期权",
    "description": "\n 1，熟悉PHP、Python,flask 框架，tornado，django等；\n2，熟悉mongodb，redis；有商城开发经验及Socket长连接开发经验；\n3，沟通及业务理解能力强，有良好的编程及文档开发习惯；\n4，负责公司物联网平台的接口及后台开发，包括项目人员管理。\n\n ",
    "address": "广州-天河区-中山大道西109号",
    "company": {
        "logo": "//www.lgstatic.com/thumbnail_160x160/image1/M00/1A/C2/CgYXBlUdGWeAcgvyAABreX1kbuQ368.png",
        "name": "广州魔豹通讯技术有限公司",
        "fourSquare": "企业服务",
        "trend": "A轮",
        "figure": "15-50人",
        "home": "http://www.ios16.com"
        }
    }
}
}
```
