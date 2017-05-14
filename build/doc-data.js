var DOCS = {};
DOCS.data = [{
    theme: 'RegExp',
    folder: 'regexp',
    files: ['js_regexp', 'quick_reference', 'solution']
}, {
    theme: 'AJAX',
    folder: 'ajax',
    files: ['xhr', 'xhr2']
}, {
    theme: 'Gulp',
    folder: 'gulp',
    files: ['api']
}, {
    theme: 'Sublime',
    folder: 'sublime',
    files: ['package_control', 'recommend']
}, {
    theme: 'React',
    folder: 'react',
    files: []
}];
/**
 * cashedFolder
 * {
 * 	 theme:'',   主题 = 主题内容
 * 	 folder:'',  文件夹名称 = 默认主题文件名
 * 	 files:[     子文件集合
 * 	 	{file:'',title:'',md:''},  文件名  文章标题  文章内容   
 * 	 	{file:'',title:'',md:''},
 * 	 	{file:'',title:'',md:''}
 * 	 ],
 * 	 md:''       主题文件内容
 * }
 * @type {[type]}
 */
DOCS.cashedFolder = null;
DOCS.getDocsFolder = function (folder, cb) {
    var files = [],
        count = 0,
        times,
        result = {};
    result.folder = folder;
    DOCS.data.some(function (el, i) {
        if (el.folder == folder) {
            files = el.files;
            result.theme = el.theme;
            return true;
        }
    });
    times = files.length + 1;
    result.files = [];
    files.some(function (el, i) {
        result.files[i] = {};
        get('md/' + folder + '/' + el + '.md', function (res) {
            var ec = /(?:\n+|^)# +([^\n]+?) *(?:\n+|$)/.exec(res);
            result.files[i].file = el;
            result.files[i].title = ec ? ec[1].trim() : '--无标题--';
            result.files[i].md = res;
            //判断complete all;
            count++;
            if (count == times) complete();
        });
    });
    get('md/' + folder + '/' + folder + '.md', function (res) {
        result.md = res;
        //判断complete all;
        count++;
        if (count == times) complete();
    });

    function get(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) return callback(xhr.responseText);
        };
    }

    function complete() {
        DOCS.cashedFolder = result;
        return cb(result);
    }
};