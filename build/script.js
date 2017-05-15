/**
 * <DocsFiles files={Array} file={String} />
 * @param {Array} files 文件列表信息
 * @param {String} file 当前选中的文件
 * <ul></ul>
 */
var DocsFolders = React.createClass({
    displayName: 'DocsFolders',

    componentWillMount: function () {},
    componentDidMount: function () {},
    componentWillReceiveProps: function () {},
    shouldComponentUpdate: function (newProps, newState) {
        return this.props.folders !== newProps.folders || this.props.folder !== newProps.folder;
    },
    componentWillUpdate: function (nextProps, nextState) {},
    componentDidUpdate: function (prevProps, prevState) {},
    componentWillUnmount: function () {},
    render: function () {
        console.log('render DocsFolfers');
        var folder = this.props.folder || '';
        function active(key) {
            return key == folder ? 'on' : '';
        }
        console.log(this.props.folders);
        return React.createElement(
            'div',
            null,
            [].map.call(this.props.folders || [], function (els, i) {
                return React.createElement(
                    'div',
                    { className: 'docs-group' },
                    React.createElement(
                        'h3',
                        null,
                        els.group,
                        ' ',
                        React.createElement(
                            'span',
                            null,
                            els.lists.length
                        )
                    ),
                    React.createElement(
                        'ul',
                        null,
                        [].map.call(els.lists, function (el) {
                            return React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: 'javascript:void(0)', className: active(el.folder), 'data-key': el.folder },
                                    el.theme,
                                    React.createElement(
                                        'span',
                                        null,
                                        el.files.length
                                    )
                                )
                            );
                        })
                    )
                );
            })
        );
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
    displayName: 'DocsArticle',

    tohtml: function () {
        var md = this.props.md || '';
        var html = window.markdownit().render(md);
        document.body.scrollTop = 0;
        this.refs.article.innerHTML = html;
        this.refs.article.querySelectorAll('pre code').forEach(function (el, i) {
            hljs.highlightBlock(el);
        });
    },
    componentWillMount: function () {},
    componentDidMount: function () {
        this.tohtml();
    },
    componentWillReceiveProps: function () {},
    shouldComponentUpdate: function (newProps, newState) {
        return this.props.md !== newProps.md;
    },
    componentWillUpdate: function (nextProps, nextState) {},
    componentDidUpdate: function (prevProps, prevState) {
        this.tohtml();
    },
    componentWillUnmount: function () {},
    render: function () {
        console.log('render article');
        return React.createElement('article', { ref: 'article' });
    }
});
/**
 * <DocsFiles files={Array} file={String} />
 * @param {Array} files 文件列表信息
 *        [{title:'String',file:'String'},...]
 * @param {String} file 当前选中的文件
 * <ul></ul>
 */
var DocsFiles = React.createClass({
    displayName: 'DocsFiles',

    componentWillMount: function () {},
    componentDidMount: function () {},
    componentWillReceiveProps: function () {},
    shouldComponentUpdate: function (newProps, newState) {
        return this.props.files !== newProps.files || this.props.file !== newProps.file;
    },
    componentWillUpdate: function (nextProps, nextState) {},
    componentDidUpdate: function (prevProps, prevState) {},
    componentWillUnmount: function () {},
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

    componentWillMount: function () {},
    componentDidMount: function () {},
    componentWillReceiveProps: function () {},
    shouldComponentUpdate: function (newProps, newState) {
        if (this.props.theme !== newProps.theme) return true;
        return false;
    },
    componentWillUpdate: function (nextProps, nextState) {},
    componentDidUpdate: function (prevProps, prevState) {},
    componentWillUnmount: function () {},
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

    getInitialState: function () {
        return {
            active: false,
            folder: '',
            file: ''
        };
    },
    componentWillMount: function () {},
    componentDidMount: function () {
        var _this = this;
        function render() {
            var hash = window.location.hash;
            var ec = hash.match(/^\#\/*([^\/]+)\/*([^\/]*)$/);
            if (ec) {
                var folder = ec[1],
                    file = ec[2];
                DOCS.getDocsFolder(folder, function () {
                    _this.setState({
                        active: true,
                        folder: folder,
                        file: file
                    });
                });
            }
        }
        render();
        window.onhashchange = function () {
            render();
        };

        this.refs.docsFunc.addEventListener('click', function (e) {
            var el = e.target;
            if (el.tagName == 'A') {
                _this.setState({
                    active: false,
                    folder: _this.state.folder,
                    file: _this.state.file
                });
            }
        });
        this.refs.docsFolders.addEventListener('click', function (e) {
            var el = e.target;
            if (el.tagName == 'A') {
                var folder = el.getAttribute('data-key');
                window.location.hash = folder + '/';
            }
        });
        this.refs.docsFiles.addEventListener('click', function (e) {
            var el = e.target;
            if (el.tagName == 'A') {
                var file = el.getAttribute('data-key');
                window.location.hash = _this.state.folder + '/' + file;
            }
        });
        this.refs.docsTheme.addEventListener('click', function (e) {
            var el = e.target;
            if (el.tagName == 'A') {
                window.location.hash = _this.state.folder + '/';
            }
        });
    },
    componentWillReceiveProps: function () {},
    shouldComponentUpdate: function (newProps, newState) {
        return true;
        // return this.props.data.theme != newProps.data.theme || this.props.data.file != newProps.file;
    },
    componentWillUpdate: function (nextProps, nextState) {},
    componentDidUpdate: function (prevProps, prevState) {},
    componentWillUnmount: function () {},
    render: function () {
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
                md = DOCS.cashedFolder.md;
            } else {
                DOCS.cashedFolder.files.some(function (el, i) {
                    if (_this.state.file == el.file) {
                        md = el.md;return true;
                    }
                });
            }
        }

        var pageClass = 'docs-page';
        if (this.state.active) {
            pageClass += ' docs-page-on';
        }
        return React.createElement(
            'div',
            { className: pageClass, ref: 'docsPage' },
            React.createElement(
                'div',
                { className: 'docs-func', ref: 'docsFunc' },
                React.createElement(
                    'a',
                    { href: 'javascript:void(0)', className: 'iconfont' },
                    '\uE600'
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:void(0)', className: 'iconfont' },
                    '\uE69F'
                )
            ),
            React.createElement(
                'div',
                { className: 'docs-home' },
                React.createElement(
                    'div',
                    { className: 'docs-folders', ref: 'docsFolders' },
                    React.createElement(DocsFolders, { folders: folders, folder: this.state.folder })
                )
            ),
            React.createElement(
                'div',
                { className: 'docs-side' },
                React.createElement(
                    'div',
                    { className: 'docs-theme', ref: 'docsTheme' },
                    React.createElement(DocsTheme, { theme: theme })
                ),
                React.createElement(
                    'div',
                    { className: 'docs-files', ref: 'docsFiles' },
                    React.createElement(DocsFiles, { files: files, file: this.state.file })
                )
            ),
            React.createElement(
                'div',
                { className: 'docs-main' },
                React.createElement(
                    'section',
                    { className: 'docs-md' },
                    React.createElement(DocsArticle, { md: md })
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(DocsPage, null), document.body);