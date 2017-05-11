# 常用解决方案

## 钱币格式化

问题描述：写一个方法 输入：1234567 返回：1,234,567

``` javascript
function formatting(num){
    if(num%1 === 0){
        return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }else{
        return num.toString().replace(/(\d)(?=(?:\d{3})+\.)/g,'$1,');
    }
}
```

