import { component, observer, on } from 'web-cell';

import { Link } from '../model/router';

interface NavItem {
    title: string;
    name?: string;
    URL: string;
    target?: string;
}

@component({ tagName: 'nav-bar' })
@observer
export class NavBar extends HTMLElement {
    title = 'GitHub 中文版';

    channels: NavItem[] = [
        { title: 'G 流', name: '事件流', URL: '#/events' },
        { title: 'G 仓', name: '开源仓库', URL: '#/repos' },
        { title: 'G 锦', name: '代码锦囊', URL: '#/gists' },
        { title: 'G 友', name: '程序员', URL: '#/users' },
        { title: 'G 团', name: '开发团队', URL: '#/users' },
        { title: '关于本站', URL: '#/ReadMe.md' },
        { title: '关于作者', URL: '#/users/TechQuery' }
    ];

    @on('submit', 'form')
    handleSearch(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const keyword = (form.elements.namedItem('keyword') as HTMLInputElement).value;

        if (!keyword.includes('/')) {
            window.location.hash = `#/users/${keyword}`;
        } else {
            window.location.hash = `#/repos/${keyword}`;
        }
    }

    render() {
        return (
            <m3e-app-bar className="sticky-top">
                <Link slot="title" to="/" className="text-decoration-none text-reset">
                    {this.title}
                </Link>
                <div slot="trailing" className="d-flex align-items-center gap-1 flex-wrap">
                    {this.channels.map(({ title, name, URL, target }) => (
                        <m3e-button
                            key={URL + title}
                            variant="text"
                            href={URL}
                            target={target || ''}
                            title={name || title}
                        >
                            {title}
                        </m3e-button>
                    ))}
                    <form className="d-flex align-items-center gap-2 ms-2">
                        <input
                            type="search"
                            name="keyword"
                            required
                            placeholder="定位：用户 ID、仓库全名"
                            className="form-control form-control-sm"
                        />
                    </form>
                </div>
            </m3e-app-bar>
        );
    }
}
