## 接口说明  

### 获取频道分类页
* url: /bookzw/catalog
* method: GET
* returns
```json
{
    "code": 0,
    "data": [
        {
            "id": "1",
            "text": "玄幻小说"
        }
    ]
}

### 获取分类列表
* url: /bookzw/list/1/1
* method: GET
* returns
```json
{
    "code": 0,
    "curpage": "1",
    "total": "97",
    "pageSize": "20",
    "data": [
        {
            "type": "玄幻小说",
            "name": "血狱魔帝",
            "sid": "5",
            "listId": "5244",
            "author": "夜行月"
        },
    ]
}

### 获取小说目录
* url: /bookzw/dir/5/5021
* method: GET
* returns
```json
{
    "code": 0,
    "data": {
        "info": {
            "thumb": "http://www.37zw.com/d/image/5/5021/5021s.jpg",
            "name": "走进修仙",
            "introInfo": " 普通版： 当一个科研人员穿越到借科学方法探求天地的世界…… 王崎：我们的口号是——学好数理化，修仙问道都不怕！ CCTV10版： 《天演图录》为何与进化论有关？飘渺无定云剑和概率云又有何关系？修真人士如何建造修真原子弹？量子力学怎样在修真中得到体现？万年前的绝世强者、今天的戒指老爷爷为何被评价为“误人子弟”“没用”？量子尊师薄耳、不准道人海森宝、太一天尊艾慈昙又与大科学家波尔、海森堡、爱因斯坦究竟有何联系？让我们跟随主持人，哦不，主角王崎一起进入今天的《走进修仙》，探索科学修仙的秘密 ",
            "author": "作者：吾道长不孤",
            "sorts": "分类：修真小说",
            "start": "状态：连载中",
            "update": "更新：2017-02-03",
            "newest": "最新：第二百四十八章 最终准备"
        },
        "list": [
            {
                "name": "第二百四十八章 最终准备",
                "id": "5",
                "sid": "5021",
                "aid": "4426314"
            }
        ]
    }
}

### 获取详情页
* url: /bookzw/show/5/5021/4424628
* method: GET
* returns
```json
{
    "code": 0,
    "data": {
            "other":{
                "id":"5",
                "sid":"5244",
                "previd":"4341355",
                "nextid":"4341357"
            },
            "title": "第二百四十五章 高灵大灭绝",
            "content": "内容...."
    },
}
