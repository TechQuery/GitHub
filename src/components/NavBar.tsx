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
    title = 'GitHub 中文版';

    channels: NavItem[] = [
        { title: 'G 流', name: '事件流', URL: '#/events' },
        { title: 'G 仓', name: '开源仓库', URL: '#/repos' },
        { title: 'G 锦', name: '代码锦囊', URL: '#/gists' },
        { title: 'G 友', name: '程序员', URL: '#/users' },
        { title: 'G 团', name: '开发团队', URL: '#/users' },
        { title: '关于本站', URL: 'ReadMe.md' },
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
            <m3e-app-bar style={{ position: 'sticky', top: '0', zIndex: '100' }}>
                <a
                    slot="title"
                    href="#/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    {this.title}
                </a>
                <div
                    slot="trailing"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        flexWrap: 'wrap'
                    }}
                >
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
                    <form
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginLeft: '0.5rem'
                        }}
                    >
                        <input
                            type="search"
                            name="keyword"
                            required
                            placeholder="定位：用户 ID、仓库全名"
                            style={{
                                padding: '0.375rem 0.75rem',
                                border: '1px solid var(--md-sys-color-outline, #ccc)',
                                borderRadius: '4px',
                                fontSize: '0.875rem'
                            }}
                        />
                    </form>
                </div>
            </m3e-app-bar>
        );
    }
}
