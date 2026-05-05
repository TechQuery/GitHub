import { type GitRepository, RepositoryModel } from 'mobx-github';
import { component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { Link } from '../stores/router';

@component({ tagName: 'repos-page' })
@observer
export default class ReposPage extends HTMLElement {
    repoStore = new RepositoryModel('EasyWebApp');

    mountedCallback() {
        this.repoStore.getList();
    }

    renderRepoItem = ({
        full_name,
        description,
        stargazers_count,
        language,
        id
    }: GitRepository) => (
        <Link key={id} to={`/repos/${full_name}`} className="list-group-item">
            <h4 className="list-group-item-heading">{full_name}</h4>
            <p className="list-group-item-text">{description || '无描述'}</p>
            <span className="badge">{stargazers_count} ⭐</span>
            {language && <span className="badge">{language}</span>}
        </Link>
    );

    render() {
        const { allItems: repositories, downloading } = this.repoStore;

        if (downloading > 0) return <Loading />;

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>GitHub 仓库 (G 仓)</h2>
                    <div className="list-group">{repositories.map(this.renderRepoItem)}</div>
                </div>
            </div>
        );
    }
}
