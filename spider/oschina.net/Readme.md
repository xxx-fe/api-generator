### 接口说明
##### 路由定义使用的是koa-router定义方式

#### 获取列表
 * url: /it/project/list/:page
 * param: page 为第几页
 * method: GET  
 * returns:
```json
{
"code": 0,
"data": [
    {
        "id": "80224",
        "name": "tinymce-4-5",
        "title": "ssss..."
    }
]
}
```

#### 获取详情
 * url: /it/project/detail/:id/:name
 * param: id 列表返回的id
 * param: name 列表返回的name
 * method: GET  
 * returns:
```json
{
"code": 0,
"data": {
        "title": "xxxxx",
        "author": "xxxx",
        "date": "2016年12月21日",
        "content": "\n \n \n \n \n \n Tissss"
    }
}
```
