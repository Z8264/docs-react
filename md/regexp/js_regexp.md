# JavaScript RegExp
## 语法

|语法|方法描述|
|--|--|
|/pattern/flags |字面量|
|new RegExp(pattern,flags) |构造函数|
|RegExp(pattern,flags)|工厂符号|

pattern:正则表达式的文本。flags:标志。

以下为浏览器支持的flags，其他标志将抛出异常(SyntaxError)。

|flags|描述|es6|
|--|--|--|
|g|全局匹配;找到所有匹配，而不是在第一个匹配后停止||
|i|忽略大小写||
|m|使用多行模式。^ 和 $ 匹配行的开头和结尾，但不匹配字符串的开头和结尾||
|u|Unicode; 将模式视为Unicode序列点的序列|es6|
|y|粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引|es6|



## 属性

|RegExp|描述|
|--|--|
|$1-$9||
|input 或 $_||
|lastMatch 或 $&||
|lastParen 或 $+||
|leftContext或 $`||
|prototype|||

|RegExp.prototype| 描述|
|--|--|
|flags||
|global||
|ignoreCase||
|multiline||
|source||
|sticky||
|unicode||

## 方法

|RegExp.prototype| 描述|
|--|--|
|~~compile()~~|已废弃。|
|exec()|检索字符串。返回找到的值，并确定其位置。|
|test()|检索字符串。返回ture或false|
