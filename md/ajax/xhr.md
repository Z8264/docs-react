# XHR-1 API 

## new XMLHttpRequest()
创建 XMLHttpRequest 对象

## open(method,url,async)
规定请求的类型、URL以及是否异步处理请求。

|参数|类型|必填|描述|
|--------|--------|--------|--------|
|`method`|String|必填|请求类型，GET 或 POST|
|`url`|String|必填|文件在服务器的位置|
|`async`|Boolen|必填|true(同步),false(异步)|

## send(string)
将请求发送到服务器，参数仅用于POST请求

## readyState
XMLHttpRequest状态

|值|状态|描述|
|--------|--------|--------|
|`0`|UNSENT|代理被创建|
|`1`|OPENED|open()已被调用|
|`2`|HEADERS_RECEIVED|send()已被调用，并且头部和状态已经可获得|
|`3`|LOADING|下载中;responseText属性已经包含部分数据|
|`4`|DONE|下载完成|

## status
HTTP 请求返回的状态码

|值|状态|描述|
|--------|--------|--------|
|`200`|OK|成功|
|`404`|Not Found|未找到|

## onreadystatechange
函数，当readyState属性改变时，被调用。

## responseText
获得字符串形式的响应数据

## responseXML
获得 XML 形式的响应数据