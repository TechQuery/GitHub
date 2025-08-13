import { component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { GitHubGist,githubStore } from '../stores/github';

@component({ tagName: 'gists-page' })
@observer
export default class GistsPage extends HTMLElement {
    connectedCallback() {
        githubStore.fetchGists();
    }

    renderGistRow = ({ id, description, created_at, updated_at }: GitHubGist, index: number) => (
        <tr key={id}>
            <td className="index">{index + 1}</td>
            <td className="ellipsis" title={description || 'No description'}>
                <a href={`#/gists/${id}`}>
                    {description || id}
                </a>
            </td>
            <td>{new Date(created_at).toLocaleDateString('zh-CN')}</td>
            <td>{new Date(updated_at).toLocaleDateString('zh-CN')}</td>
        </tr>
    );

    render() {
        const { downloading, gists } = githubStore;

        if (downloading) return <Loading />;

        return (
            <div className="grid">
                <div className="s12">
                    <h2>GitHub Gists (G 锦)</h2>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>标题</th>
                                    <th>创建时间</th>
                                    <th>更新时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gists.map(this.renderGistRow)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}