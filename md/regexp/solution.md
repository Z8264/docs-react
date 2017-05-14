# Solutions to some problems

## 验证
|格式|表达式|
|-|-|
|空行|`/^\s*$/`|
| HTML标记|`/<\s*(\S+)(\s[^>]*)?>[\s\S]*<\s*\/\1\s*>/`|
|汉字 |`/^[\u4e00-\u9fa5]*/`|
|Email|`/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/`|




## 钱币格式化

问题描述：写一个方法 输入：1234567 返回：1,234,567

``` javascript
function formatting(num) {
    if (num % 1 === 0) {
        return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    } else {
        return num.toString().replace(/(\d)(?=(?:\d{3})+\.)/g, '$1,');
    }
}
```

