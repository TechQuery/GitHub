import { component, observer, on } from 'web-cell';

interface NavItem {
    title: string;
    name?: string;
    URL: string;
    target?: string;
}

@component({ tagName: 'nav-bar' })
@observer
export class NavBar extends HTMLElement {
    dark = true;
    title = 'GitHub 中文版';

    channels: NavItem[] = [
        {
            title: 'G 流',
            name: '事件流',
            URL: '#/events'
        },
        {
            title: 'G 仓',
            name: '开源仓库',
            URL: '#/repos'
        },
        {
            title: 'G 锦',
            name: '代码锦囊',
            URL: '#/gists'
        },
        {
            title: 'G 友',
            name: '程序员',
            URL: '#/users'
        },
        {
            title: 'G 团',
            name: '开发团队',
            URL: '#/users'
        },
        {
            title: '关于本站',
            URL: 'ReadMe.md'
        },
        {
            title: '关于作者',
            URL: '#/users/TechQuery'
        }
    ];

    @on('submit', '#search-form')
    handleSearch(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const keyword = (form.elements.namedItem('keyword') as HTMLInputElement).value;

        if (!keyword.includes('/')) {
            // User search
            window.location.hash = `#/users/${keyword}`;
        } else {
            // Repository search
            window.location.hash = `#/repos/${keyword}`;
        }
    }

    render() {
        return (
            <nav className={`navbar navbar-fixed-top ${this.dark ? 'navbar-inverse' : ''}`}>
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#Main_Nav"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#/" title="返回首页">
                            {this.title}
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="Main_Nav">
                        <form className="navbar-form navbar-left" id="search-form">
                            <div className="form-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    name="keyword"
                                    required
                                    placeholder="定位：用户 ID、仓库全名"
                                />
                            </div>
                        </form>

                        <ul className="nav navbar-nav">
                            {this.channels.map(({ title, name, URL, target }, index) => (
                                <li role={URL ? '' : 'separator'} className={URL ? '' : 'divider'}>
                                    <a
                                        target={target || ''}
                                        href={URL}
                                        title={name}
                                        data-autofocus={index === 0 ? 'true' : undefined}
                                    >
                                        {title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
