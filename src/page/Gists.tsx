import { component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { GitHubGist, githubStore } from '../stores/github';
import { Link } from '../stores/router';

@component({ tagName: 'gists-page' })
@observer
export default class GistsPage extends HTMLElement {
    connectedCallback() {
        githubStore.fetchGists();
    }

    renderGistRow = ({ id, description, created_at, updated_at }: GitHubGist, index: number) => (
        <tr key={id}>
            <td className="py-3 px-3">{index + 1}</td>
            <td className="py-3 px-3" title={description || 'No description'}>
                <Link to={`/gists/${id}`}>{description || id}</Link>
            </td>
            <td className="py-3 px-3">{new Date(created_at).toLocaleDateString('zh-CN')}</td>
            <td className="py-3 px-3">{new Date(updated_at).toLocaleDateString('zh-CN')}</td>
        </tr>
    );

    render() {
        const { downloading, gists } = githubStore;

        if (downloading) return <Loading />;

        return (
            <div>
                <h2>GitHub Gists (G 锦)</h2>
                <m3e-card variant="outlined">
                    <div slot="content" className="table-responsive p-0">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th className="py-3 px-3">序号</th>
                                    <th className="py-3 px-3">标题</th>
                                    <th className="py-3 px-3">创建时间</th>
                                    <th className="py-3 px-3">更新时间</th>
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
