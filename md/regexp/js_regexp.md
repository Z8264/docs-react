# JavaScript RegExp

参考文档：[https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

## 语法 (Syntax)

|语法|方法|
|--|--|
|/pattern/flags |字面量(literal)|
|new RegExp(pattern,flags) |构造函数(constructor)|
|RegExp(pattern,flags)|工厂符号(fatory notations)|

pattern:正则表达式的文本。flags:标志。

flags可以具有以下值的任意组合，其他标志将抛出异常(SyntaxError)。

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
|leftContext 或 $`||
|rightContext 或 $'||
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
