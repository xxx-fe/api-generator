### 接口说明

#### 获取分类
url: /book/catalog
method: GET
returns:
```json
{
"code": 0,
"data": [
    {
    "id": "2",
    "text": "武侠修真"
    }
]
...
}
```


#### 获取分类下的列表
url: /book/list/id
method: GET
param: id 为分类id
returns:
```json
{
"code": 0,
"data": [
    {
        "id": "97514",
        "text": "xxxxx"
    }
]
...
}
```

#### 获取小说的目录
url: /book/dir/id
method: GET
param: id 为列表返回的id
returns:
```json
{
"code": 0,
"data": [
    {
        "text": "第1章 楔子",
        "id": "95187",
        "sid": "95",
        "pageId": 30999731
    }
]
...
}
```

#### 获取某章节具体内容
url: /book/show/sid/id/pageId
method: GET
param: sid、id、pageId 为目录返回的sid id pageId
returns:
```json
{
"code": 0,
"data": "xxxxx"
}
```
