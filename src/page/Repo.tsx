import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';

import { githubStore } from '../stores/github';

@component({ tagName: 'repo-page' })
@observer
export default class RepoPage extends HTMLElement {
    @observable
    @attribute
    accessor owner = '';

    @observable
    @attribute
    accessor repo = '';

    mountedCallback() {
        if (this.owner && this.repo) githubStore.fetchRepository(this.owner, this.repo);
    }

    render() {
        const { currentRepo: repository, downloading } = githubStore;

        if (downloading > 0)
            return (
                <div className="text-center">
                    <div className="spinner">加载中...</div>
                </div>
            );
        if (!repository) return <div>仓库不存在</div>;

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>{repository.full_name}</h2>
                    <p className="lead">{repository.description || '无描述'}</p>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-xs-3 text-center">
                                            <strong>{repository.stargazers_count}</strong>
                                            <br />
                                            <small>Stars</small>
                                        </div>
                                        <div className="col-xs-3 text-center">
                                            <strong>{repository.forks_count}</strong>
                                            <br />
                                            <small>Forks</small>
                                        </div>
                                        <div className="col-xs-3 text-center">
                                            <strong>{repository.language || 'N/A'}</strong>
                                            <br />
                                            <small>语言</small>
                                        </div>
                                        <div className="col-xs-3 text-center">
                                            <a
                                                href={repository.html_url}
                                                target="_blank"
                                                className="btn btn-primary btn-sm"
                                                rel="noreferrer"
                                            >
                                                查看仓库
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">仓库所有者</div>
                                <div className="panel-body text-center">
                                    <img
                                        src={repository.owner.avatar_url}
                                        className="img-circle"
                                        width={64}
                                        height={64}
                                        alt={repository.owner.login}
                                    />
                                    <h4>
                                        <a href={`#/users/${repository.owner.login}`}>
                                            {repository.owner.login}
                                        </a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
