import { component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { GitHubGist, githubStore } from '../stores/github';

@component({ tagName: 'gists-page' })
@observer
export default class GistsPage extends HTMLElement {
    connectedCallback() {
        githubStore.fetchGists();
    }

    renderGistRow = (
        { id, description, created_at, updated_at }: GitHubGist,
        index: number
    ) => (
        <tr key={id}>
            <td style={{ padding: '0.75rem' }}>{index + 1}</td>
            <td
                style={{ padding: '0.75rem' }}
                title={description || 'No description'}
            >
                <a href={`#/gists/${id}`}>{description || id}</a>
            </td>
            <td style={{ padding: '0.75rem' }}>
                {new Date(created_at).toLocaleDateString('zh-CN')}
            </td>
            <td style={{ padding: '0.75rem' }}>
                {new Date(updated_at).toLocaleDateString('zh-CN')}
            </td>
        </tr>
    );

    render() {
        const { downloading, gists } = githubStore;

        if (downloading) return <Loading />;

        return (
            <div>
                <h2>GitHub Gists (G 锦)</h2>
                <m3e-card variant="outlined">
                    <div slot="content" style={{ overflowX: 'auto', padding: '0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr
                                    style={{
                                        borderBottom:
                                            '1px solid var(--md-sys-color-outline-variant, #e0e0e0)'
                                    }}
                                >
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                                        序号
                                    </th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                                        标题
                                    </th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                                        创建时间
                                    </th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                                        更新时间
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{gists.map(this.renderGistRow)}</tbody>
                        </table>
                    </div>
                </m3e-card>
            </div>
        );
    }
}
