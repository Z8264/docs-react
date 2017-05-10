
/**
 * <Article md = {String} />
 * @param {String} md MD文档内容
 * @return <article> md to html </article>
 *
 * 依赖:
 * highlight.pack.js markdown-it.min.js
 */
var Article = React.createClass({
    componentDidMount: function() {
        var md = this.props.md || '';
        var article = this.refs.article;
        // md to html
        var markdownit = window.markdownit();
        var html = markdownit.render(md);
        // append to article
        article.innerHTML = html;
        // highlight
        article.querySelectorAll('pre code').forEach(function(el, i) {
            hljs.highlightBlock(el);
        });
    },
    render: function() {
        return <article ref="article"></article>
    }
})
/**
 * ArticleLists
 * <ul></ul>
 */
var ArticleLists = React.createClass({
    render: function() {
        console.log(this.props.files);
        return <ul>
            {
            [].map.call(this.props.files || [], function(el) {
                return <li><a href="javascript:void(0)" data-key={el.file}>{el.title}</a></li>
            })
            }
            </ul>
    }
});
/**
 *  Main
 */
var Main = React.createClass({
    render: function() {
        var md = this.props.md;
        var files = [{
            file: 'solution',
            title: '标题名称'
        }, {
            file: 'regex',
            title: '第二个标题'
        }]
        return <div className="docs-page">
                    <div className="docs-side">
                        <div className="docs-title"></div>
                        <div className="docs-nav"><ArticleLists files={files}/></div>
                    </div>
                    <div className="docs-main">
                        <section className="docs-md"><Article md = {md} /></section>
                    </div>
                </div>
    }
});


//article 控制
var md = "# gulp API\r\n## gulp.src(globs[,optitons])\r \u8FD4\u56DE\u5F53\u524D\u6587\u4EF6\u6D41\u3002\r |\u53C2\u6570|\u7C7B\u578B|\u5FC5\u586B|\u63CF\u8FF0\r\n|-|-|-|-|\r\n|`globs`|String or StringArray|\u5FC5\u586B|\u6E90\u6587\u4EF6\u8DEF\u5F84|\r\n|`options`|Object|\u53EF\u9009| - |\r # \u5E38\u7528\u89E3\u51B3\u65B9\u6848\r ## \u94B1\u5E01\u683C\u5F0F\u5316\r \u95EE\u9898\u63CF\u8FF0\uFF1A\u5199\u4E00\u4E2A\u65B9\u6CD5 \u8F93\u5165\uFF1A1234567 \u8FD4\u56DE\uFF1A1,234,567\r ``` javascript\r\nfunction formatting(num){\r }\r\n```";
// ReactDOM.render(
//     <Article md = {md} />,
//     document.querySelector('.docs-md')
// );

ReactDOM.render(
    <Main md = {md} />,
    document.body
);