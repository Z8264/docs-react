# Sublime Text 3 插件


## 安装Package Control

1、按 `Ctrl + ~` 调出console

2、粘贴以下代码到底部命令行并按回车：

`import urllib.request,os;pf = 'Package Control.sublime-package';ipp = sublime.installed_packages_path();urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) );open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())`

3、重启Sublime Text 3。

4、如果在 `Perferences` 看到 `Package Control` ，则安装成功。

## 使用Package Control安装/删除插件

1、按下 `Ctrl+Shift+P` 调出命令面板，或者打开 `Perferences` 中的 `Package Control`

2、安装输入 `Install Package` ，删除输入 `Remove Package` ，并选中

3、在列表中选中要安装/删除的插件

## 推荐插件

|名称|    描述|
|-|-|
|`docblockr`|   代码自动注释生成|
|`CodeFormatter`|   对代码进行格式化|
|`CSSComb`| CSS属性进行排序的格式化插件|
|`MarkdownEditing`|支持Markdown语法高亮；支持Github Favored Markdown语法；|

