import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { GitHubCommit, GitHubContents, GitHubIssue, GitHubMilestone,githubStore } from '../stores/github';

@component({ tagName: 'repo-page' })
@observer
export default class RepoPage extends HTMLElement {
    @observable
    @attribute
    accessor owner = '';

    @observable
    @attribute
    accessor repo = '';

    @observable accessor activeTab = 'source';

    mountedCallback() {
        if (this.owner && this.repo) {
            githubStore.fetchRepository(this.owner, this.repo);
            this.loadTabContent();
        }
    }

    loadTabContent() {
        if (!this.owner || !this.repo) return;
        
        switch (this.activeTab) {
            case 'source':
                githubStore.fetchRepoContents(this.owner, this.repo);
                break;
            case 'commits':
                githubStore.fetchRepoCommits(this.owner, this.repo);
                break;
            case 'issues':
                githubStore.fetchRepoIssues(this.owner, this.repo);
                break;
            case 'milestones':
                githubStore.fetchRepoMilestones(this.owner, this.repo);
                break;
        }
    }

    handleTabClick = (tabName: string) => {
        this.activeTab = tabName;
        this.loadTabContent();
    };

    renderFileItem = ({ name, type, html_url, download_url }: GitHubContents) => (
        <li key={name} className="list-group-item">
            <i className={`fa ${type === 'dir' ? 'fa-folder' : 'fa-file'}`}></i>
            {' '}
            <a href={html_url} target="_blank" rel="noreferrer">{name}</a>
            {type === 'file' && download_url && (
                <a href={download_url} className="btn btn-xs btn-default pull-right" download>
                    下载
                </a>
            )}
        </li>
    );

    renderCommitItem = ({ sha, commit, author, html_url }: GitHubCommit) => (
        <div key={sha} className="media">
            <div className="media-left">
                {author && (
                    <img src={author.avatar_url} className="media-object" width="40" height="40" alt={author.login} />
                )}
            </div>
            <div className="media-body">
                <h5 className="media-heading">
                    <a href={html_url} target="_blank" rel="noreferrer">
                        {commit.message.split('\n')[0]}
                    </a>
                </h5>
                <small>
                    {author?.login} committed on {new Date(commit.author.date).toLocaleDateString('zh-CN')}
                </small>
            </div>
        </div>
    );

    renderIssueItem = ({ number, title, state, user, created_at }: GitHubIssue) => (
        <div key={number} className="media">
            <div className="media-left">
                <img src={user.avatar_url} className="media-object" width="40" height="40" alt={user.login} />
            </div>
            <div className="media-body">
                <h5 className="media-heading">
                    <a href={`#/repos/${this.owner}/${this.repo}/issues/${number}`}>
                        #{number} {title}
                    </a>
                    <span className={`label label-${state === 'open' ? 'success' : 'danger'}`}>
                        {state === 'open' ? '开启' : '关闭'}
                    </span>
                </h5>
                <small>
                    {user.login} created on {new Date(created_at).toLocaleDateString('zh-CN')}
                </small>
            </div>
        </div>
    );

    renderMilestoneItem = ({ number, title, description, state, creator, created_at, open_issues, closed_issues }: GitHubMilestone) => (
        <div key={number} className="panel panel-default">
            <div className="panel-body">
                <h4>
                    <a href={`#/repos/${this.owner}/${this.repo}/milestones/${number}`}>
                        {title}
                    </a>
                    <span className={`label label-${state === 'open' ? 'success' : 'danger'}`}>
                        {state === 'open' ? '开启' : '关闭'}
                    </span>
                </h4>
                {description && <p>{description}</p>}
                <div className="progress">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${closed_issues / (open_issues + closed_issues) * 100}%` }}
                    >
                        {closed_issues}/{open_issues + closed_issues}
                    </div>
                </div>
                <small>
                    Created by {creator.login} on {new Date(created_at).toLocaleDateString('zh-CN')}
                </small>
            </div>
        </div>
    );

    renderTabContent() {
        const { downloading, repoContents, repoCommits, repoIssues, repoMilestones } = githubStore;

        if (downloading > 0) return <Loading />;

        switch (this.activeTab) {
            case 'source':
                return (
                    <div>
                        <h4>源代码文件</h4>
                        {repoContents.length === 0 ? (
                            <p>没有找到文件</p>
                        ) : (
                            <ul className="list-group">
                                {repoContents.map(this.renderFileItem)}
                            </ul>
                        )}
                    </div>
                );

            case 'commits':
                return (
                    <div>
                        <h4>提交历史</h4>
                        {repoCommits.length === 0 ? (
                            <p>没有找到提交记录</p>
                        ) : (
                            <div>
                                {repoCommits.map(this.renderCommitItem)}
                            </div>
                        )}
                    </div>
                );

            case 'issues':
                return (
                    <div>
                        <h4>问题列表</h4>
                        {repoIssues.length === 0 ? (
                            <p>没有找到问题</p>
                        ) : (
                            <div>
                                {repoIssues.map(this.renderIssueItem)}
                            </div>
                        )}
                    </div>
                );

            case 'milestones':
                return (
                    <div>
                        <h4>里程碑</h4>
                        {repoMilestones.length === 0 ? (
                            <p>没有找到里程碑</p>
                        ) : (
                            <div>
                                {repoMilestones.map(this.renderMilestoneItem)}
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    }

    render() {
        const { currentRepo: repository, downloading } = githubStore;

        if (downloading > 0 && !repository) return <Loading />;
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

                    {/* Tab Navigation */}
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="nav nav-tabs">
                                <li className={this.activeTab === 'source' ? 'active' : ''}>
                                    <a href="#" onClick={() => this.handleTabClick('source')}>
                                        源代码
                                    </a>
                                </li>
                                <li className={this.activeTab === 'commits' ? 'active' : ''}>
                                    <a href="#" onClick={() => this.handleTabClick('commits')}>
                                        开发流
                                    </a>
                                </li>
                                <li className={this.activeTab === 'issues' ? 'active' : ''}>
                                    <a href="#" onClick={() => this.handleTabClick('issues')}>
                                        问题集
                                        <span className="badge">{repository.open_issues_count}</span>
                                    </a>
                                </li>
                                <li className={this.activeTab === 'milestones' ? 'active' : ''}>
                                    <a href="#" onClick={() => this.handleTabClick('milestones')}>
                                        路线图
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content" style={{ marginTop: '20px' }}>
                                {this.renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
