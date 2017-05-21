/**
 * <DocsFiles files={Array} file={String} />
 * @param {Array} files 文件列表信息
 * @param {String} file 当前选中的文件
 * <ul></ul>
 */
var DocsFolders = React.createClass({
    componentWillMount: function() {},
    componentDidMount: function() {},
    componentWillReceiveProps: function() {},
    shouldComponentUpdate: function(newProps, newState) {
        return (this.props.folders !== newProps.folders || this.props.folder !== newProps.folder)
    },
    componentWillUpdate: function(nextProps, nextState) {},
    componentDidUpdate: function(prevProps, prevState) {},
    componentWillUnmount: function() {},
    render: function() {
        console.log('render DocsFolfers');
        var folder = this.props.folder || '';
        function active(key) {
            return key == folder ? 'on' : '';
        }
        console.log(this.props.folders);
        return <div>
            {
                [].map.call(this.props.folders || [],function(els,i){
                    return <div className = "docs-group">
                        <h3>{els.group} <span>{els.lists.length}</span></h3>
                        <ul>
                        {
                            [].map.call(els.lists,function(el){
                                return <li><a href="javascript:void(0)" className = {active(el.folder)} data-key={el.folder}>{el.theme}<span>{el.files.length}</span></a></li>
                            })
                        }
                        </ul>
                    </div>
                })
            }
        </div>
    }
});
/**
 * <DocsArticle md = {String} />
 * @param md {String} MD文档内容
 * @return <article> md to html </article>
 *
 * 依赖: highlight.pack.js markdown-it.min.js
 */
var DocsArticle = React.createClass({
    tohtml: function() {
        var md = this.props.md || '';
        var html = window.markdownit().render(md);
        document.body.scrollTop = 0;
        this.refs.article.innerHTML = html;
        this.refs.article.querySelectorAll('pre code').forEach(function(el, i) {
            hljs.highlightBlock(el);
        });
    },
    componentWillMount: function() {},
    componentDidMount: function() {
        this.tohtml();
    },
    componentWillReceiveProps: function() {},
    shouldComponentUpdate: function(newProps, newState) {
        return (this.props.md !== newProps.md)
    },
    componentWillUpdate: function(nextProps, nextState) {},
    componentDidUpdate: function(prevProps, prevState) {
        this.tohtml();
    },
    componentWillUnmount: function() {},
    render: function() {
        console.log('render article');
        return <article ref="article"></article>
    }
})
/**
 * <DocsFiles files={Array} file={String} />
 * @param {Array} files 文件列表信息
 *        [{title:'String',file:'String'},...]
 * @param {String} file 当前选中的文件
 * <ul></ul>
 */
var DocsFiles = React.createClass({
    componentWillMount: function() {},
    componentDidMount: function() {},
    componentWillReceiveProps: function() {},
    shouldComponentUpdate: function(newProps, newState) {
        return (this.props.files !== newProps.files || this.props.file !== newProps.file)
    },
    componentWillUpdate: function(nextProps, nextState) {},
    componentDidUpdate: function(prevProps, prevState) {},
    componentWillUnmount: function() {},
    render: function() {
        console.log('render lists');
        var file = this.props.file || '';
        function active(key) {
            return key == file ? 'on' : '';
        }
        return <ul>
            {
            [].map.call(this.props.files || [], function(el) {
                return <li><a href="javascript:void(0)" className = {active(el.file)} data-key={el.file}>{el.title}</a></li>
            })
            }
            </ul>
    }
});
/**
 * <DocsTheme theme={String}/>
 * @param {String} theme Docs主题
 * @return <a href="">{theme}</a>
 */
var DocsTheme = React.createClass({
    componentWillMount: function() {},
    componentDidMount: function() {},
    componentWillReceiveProps: function() {},
    shouldComponentUpdate: function(newProps, newState) {
        if (this.props.theme !== newProps.theme) return true;
        return false;
    },
    componentWillUpdate: function(nextProps, nextState) {},
    componentDidUpdate: function(prevProps, prevState) {},
    componentWillUnmount: function() {},
    render: function() {
        console.log('render theme');
        var theme = this.props.theme || '';
        return <a href="javascript:void(0)">{theme}</a>
    }
})
/**
 *  DocsPage
 */
var DocsPage = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            folder: '',
            file: ''
        };
    },
    componentWillMount: function() {},
    componentDidMount: function() {
        var _this = this;
        function render() {
            var hash = window.location.hash;
            var ec = hash.match(/^\#\/*([^\/]+)\/*([^\/]*)$/);
            if (ec) {
                var folder = ec[1],
                    file = ec[2];
                DOCS.getDocsFolder(folder, function() {
                    _this.setState({
                        active: true,
                        folder: folder,
                        file: file
                    });
                })
            }
        }
        render();
        window.onhashchange = function() {
            render();
        }

        this.refs.docsFunc.addEventListener('click', function(e) {
            var el = e.target;
            if (el.tagName == 'A') {
                _this.setState({
                    active: false,
                    folder: _this.state.folder,
                    file: _this.state.file
                });
            }
        })
        this.refs.docsFolders.addEventListener('click', function(e) {
            var el = e.target;
            if (el.tagName == 'A') {
                var folder = el.getAttribute('data-key');
                window.location.hash = folder + '/';
            }
        })
        this.refs.docsFiles.addEventListener('click', function(e) {
            var el = e.target;
            if (el.tagName == 'A') {
                var file = el.getAttribute('data-key');
                window.location.hash = _this.state.folder + '/' + file;
            }
        });
        this.refs.docsTheme.addEventListener('click', function(e) {
            var el = e.target;
            if (el.tagName == 'A') {
                window.location.hash = _this.state.folder + '/';
            }
        });
    },
    componentWillReceiveProps: function() {},
    shouldComponentUpdate: function(newProps, newState) {
        return true;
    // return this.props.data.theme != newProps.data.theme || this.props.data.file != newProps.file;
    },
    componentWillUpdate: function(nextProps, nextState) {},
    componentDidUpdate: function(prevProps, prevState) {},
    componentWillUnmount: function() {},
    render: function() {
        console.log('render page');
        var _this = this;
        var folders = DOCS.data;
        var files = [],
            theme = '',
            md = '';

        if (DOCS.cashedFolder) {
            theme = DOCS.cashedFolder.theme;
            files = DOCS.cashedFolder.files;
            if (!this.state.file) {
                md = DOCS.cashedFolder.md
            } else {
                DOCS.cashedFolder.files.some(function(el, i) {
                    if (_this.state.file == el.file) {
                        md = el.md;return true;
                    }
                })
            }
        }

        var pageClass = 'docs-page';
        if (this.state.active) {
            pageClass += ' docs-page-on';
        }
        return <div className={pageClass} ref="docsPage">
                    <div className = "docs-func" ref="docsFunc">
                        <a href="javascript:void(0)" className="iconfont">&#xe600;</a>
                        <a href="javascript:void(0)" className="iconfont">&#xe69f;</a>
                    </div>
                    <div className="docs-home">
                        <div className="docs-folders" ref="docsFolders"><DocsFolders folders={folders} folder={this.state.folder}/></div>
                    </div>
                    <div className="docs-side">
                        <div className="docs-theme" ref="docsTheme"><DocsTheme theme = {theme} /></div>
                        <div className="docs-files" ref="docsFiles"><DocsFiles files={files} file = {this.state.file}/></div>
                    </div>
                    <div className="docs-main">
                        <section className="docs-md"><DocsArticle md = {md} /></section>
                    </div>
                </div>
    }
});


ReactDOM.render(
    <DocsPage />,
    document.body
);
