var casheData = {};
var md = function (state = '', action) {
    switch (action.type) {
        case 'LoadArticle':
            state = casheData.md;
            return state;
        default:
            return casheData.md || '';
    }
};
var files = function (state = [], action) {
    switch (action.type) {
        default:
            return casheData.files || [];
    }
};

var theme = function (state = '', action) {
    switch (action.type) {
        default:
            return casheData.theme || '';
    }
};

var reducer = Redux.combineReducers({ md, files, theme });

var store = Redux.createStore(reducer);

/**
 * <DocsArticle md = {String} />
 * @param md {String} MD文档内容
 * @return <article> md to html </article>
 *
 * 依赖: highlight.pack.js markdown-it.min.js
 */
var DocsArticle = React.createClass({
    displayName: 'DocsArticle',

    componentDidMount: function () {
        var md = this.props.md || '';
        var article = this.refs.article;
        // md to html
        var markdownit = window.markdownit();
        var html = markdownit.render(md);
        // append to article
        article.innerHTML = html;
        // highlight
        article.querySelectorAll('pre code').forEach(function (el, i) {
            hljs.highlightBlock(el);
        });
    },
    render: function () {
        console.log('render article');
        return React.createElement('article', { ref: 'article' });
    }
});
/**
 * <ArticleLists files={Array} file={String} />
 * @param {Array} files 文件列表信息
 *        [{title:'String',file:'String'},...]
 * @param {String} file 当前选中的文件
 * <ul></ul>
 */
var DocsLists = React.createClass({
    displayName: 'DocsLists',

    render: function () {
        console.log('render lists');
        var file = this.props.file || '';
        function active(key) {
            return key == file ? 'on' : '';
        }
        return React.createElement(
            'ul',
            null,
            [].map.call(this.props.files || [], function (el) {
                return React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'a',
                        { href: 'javascript:void(0)', className: active(el.file), 'data-key': el.file },
                        el.title
                    )
                );
            })
        );
    }
});
/**
 * <DocsTheme theme={String}/>
 * @param {String} theme Docs主题
 * @return <a href="">{theme}</a>
 */
var DocsTheme = React.createClass({
    displayName: 'DocsTheme',

    render: function () {
        console.log('render theme');
        var theme = this.props.theme || '';
        return React.createElement(
            'a',
            { href: 'javascript:void(0)' },
            theme
        );
    }
});
/**
 *  DocsPage
 */
var DocsPage = React.createClass({
    displayName: 'DocsPage',

    render: function () {
        console.log('render page');
        return React.createElement(
            'div',
            { className: 'docs-page' },
            React.createElement(
                'div',
                { className: 'docs-side' },
                React.createElement(
                    'div',
                    { className: 'docs-title' },
                    React.createElement(DocsTheme, { theme: store.getState().theme })
                ),
                React.createElement(
                    'div',
                    { className: 'docs-nav' },
                    React.createElement(DocsLists, { files: store.getState().files })
                )
            ),
            React.createElement(
                'div',
                { className: 'docs-main' },
                React.createElement(
                    'section',
                    { className: 'docs-md' },
                    React.createElement(DocsArticle, { md: store.getState().md })
                )
            )
        );
    }
});

//article 控制
// var md = "# gulp API\r\n## gulp.src(globs[,optitons])\r \u8FD4\u56DE\u5F53\u524D\u6587\u4EF6\u6D41\u3002\r |\u53C2\u6570|\u7C7B\u578B|\u5FC5\u586B|\u63CF\u8FF0\r\n|-|-|-|-|\r\n|`globs`|String or StringArray|\u5FC5\u586B|\u6E90\u6587\u4EF6\u8DEF\u5F84|\r\n|`options`|Object|\u53EF\u9009| - |\r # \u5E38\u7528\u89E3\u51B3\u65B9\u6848\r ## \u94B1\u5E01\u683C\u5F0F\u5316\r \u95EE\u9898\u63CF\u8FF0\uFF1A\u5199\u4E00\u4E2A\u65B9\u6CD5 \u8F93\u5165\uFF1A1234567 \u8FD4\u56DE\uFF1A1,234,567\r ``` javascript\r\nfunction formatting(num){\r }\r\n```";
// ReactDOM.render(
//     <Article md = {md} />,
//     document.querySelector('.docs-md')
// );
// 


function render() {
    ReactDOM.render(React.createElement(DocsPage, null), document.body);
}

store.subscribe(render);

var li;
DOCS.getDocsData('ajax', function (data) {
    casheData = data;
    render();
});

// setTimeout(function(){

// DOCS.getDocsData('regexp',function(data){
// casheData = data;
// store.dispatch({type:'LoadTheme'});
// store.dispatch({type:'LoadLists'});
// store.dispatch({type:'LoadArticle'});
// render();
// })
// },1000);