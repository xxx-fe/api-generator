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
