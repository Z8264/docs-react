# Package Control

> The Sublime Text package manager that makes it exceedingly simple to find, install and keep packages up-to-date;

Sublime 包（插件）管理工具，使插件更加容易被找到、安装和保持更新。

官网地址：[https://packagecontrol.io/](https://packagecontrol.io/)

> preferences ['pref(ə)r(ə)nsɪz] 参数选择（preference的复数）


## 安装 Package Control 

1、按 `Ctrl + ~` 调出console

2、粘贴以下代码到底部命令行并按回车(For Sublime text 3)：

`import urllib.request,os;pf = 'Package Control.sublime-package';ipp = sublime.installed_packages_path();urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) );open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())`

3、重启 Sublime Text 3。

4、如果在 `Perferences` 看到 `Package Control` ，则安装成功。

## 使用 Package Control 安装/删除插件

1、按下 `Ctrl+Shift+P` 调出命令面板，或者打开 `Perferences` 中的 `Package Control`

2、安装输入 `Install Package` ，删除输入 `Remove Package` ，并选中

3、在列表中选中要安装/删除的插件

4、成功后，重启浏览器


