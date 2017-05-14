# gulp API
## gulp.src(globs[,optitons])

返回当前文件流。

|参数|类型|必填|描述
|-|-|-|-|
|`globs`|String or StringArray|必填|源文件路径|
|`options`|Object|可选| - |

|匹配符|说明|举例|描述|
|-|-|-|-|
| `*` |   所有文件 | src/*.js | src下的所有js文件 |
| `**`  | 0个或多个子文件夹| rc/**/*.js|src的0个或多个子文件夹下的js文件|
|  `{}` |多个属性 | src/{a,b}.js|a.js和b.js文件 | 
| `!` | 排除文件 |   !src/a.js|不包含src下的a.js文件|

|options|类型|默认|描述|
|-|-|-|-|
|`buffer`|Boolean|true|false：返回file.content的流并且不缓冲文件|
|`read`|Boolean|true|false：不执行读取文件操作，返回null|
|`base`|String||路径拼接|

## gulp.dest(path[,options])

按指定路径输出文件。

|参数|类型|必填|描述
|-|-|-|-|
|`path`|String or Function|必填|输出目录|
|`options`|Object|可选| - |

|options|类型|默认|描述|
|-|-|-|
|`cwd`|String|process.cwd()|输出目录的cwd参数|
|`mode`|String|0777|定义权限|


## gulp.task(name[,deps],fn)

定义一个任务

|参数|类型|必填|描述
|-|-|-|-|
|`name`|String|必填|任务的名字|
|`deps`|Array|可选|依赖的任务|
|`fn`|Function|必填| 定义操作 |

## gulp.watch(glob[,opts],tasks) / gulp.watch(glob[,opts,cb])

监视文件。

|参数|类型|必填|描述
|-|-|-|-|
|`glob`|String or StringArray|必填|源文件路径|
|`opts`|Object|可选| - |
|`tasks`|StringArray|必填| 需要执行的任务的名称数组 |
|`cb(event)`|Function|可选|每个文件变化执行的回调函数|