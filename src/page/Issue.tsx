import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { GitHubIssueComment, githubStore } from '../stores/github';

@component({ tagName: 'issue-page' })
@observer
export default class IssuePage extends HTMLElement {
    @observable
    @attribute
    accessor owner = '';

    @observable
    @attribute
    accessor repo = '';

    @observable
    @attribute
    accessor issueNumber = '';

    mountedCallback() {
        if (this.owner && this.repo && this.issueNumber) {
            const issueNum = parseInt(this.issueNumber, 10);
            githubStore.fetchIssue(this.owner, this.repo, issueNum);
            githubStore.fetchIssueComments(this.owner, this.repo, issueNum);
        }
    }

    renderComment = ({ id, user, body, created_at, updated_at }: GitHubIssueComment) => (
        <section key={id} className="media">
            <div className="media-left text-center">
                <a href={`#/users/${user?.login}`} title={user?.login}>
                    <img
                        className="media-object"
                        src={user?.avatar_url}
                        style={{ width: '50px', height: '50px' }}
                        alt={user?.login}
                    />
                    <div className="ellipsis">{user?.login}</div>
                </a>
                <abbr title={new Date(created_at).toLocaleString()}>
                    {new Date(created_at).toLocaleDateString('zh-CN')}
                </abbr>
            </div>
            <div className="media-body panel panel-default">
                <div className="panel-heading">
                    <abbr title={new Date(updated_at).toLocaleString()}>
                        {new Date(updated_at).toLocaleDateString('zh-CN')}
                    </abbr>{' '}
                    更新
                </div>
                <div className="panel-body" innerHTML={body?.replace(/\n/g, '<br>')} />
            </div>
        </section>
    );

    render() {
        const { currentIssue: issue, issueComments, downloading } = githubStore;

        if (downloading > 0) return <Loading />;

        if (!issue?.user) return <div>问题不存在</div>;

        return (
            <div className="row">
                <div className="col-md-9">
                    <h3>
                        #{issue.number} {issue.title}
                        <span
                            className={`label label-${
                                issue.state === 'open' ? 'success' : 'danger'
                            }`}
                        >
                            {issue.state === 'open' ? '开启' : '关闭'}
                        </span>
                    </h3>

                    {/* Original Issue */}
                    <section className="media">
                        <div className="media-left text-center">
                            <a href={`#/users/${issue.user.login}`} title={issue.user.login}>
                                <img
                                    className="media-object"
                                    src={issue.user.avatar_url}
                                    style={{ width: '50px', height: '50px' }}
                                    alt={issue.user.login}
                                />
                                <div className="ellipsis">{issue.user.login}</div>
                            </a>
                            <abbr title={new Date(issue.created_at).toLocaleString()}>
                                {new Date(issue.created_at).toLocaleDateString('zh-CN')}
                            </abbr>
                        </div>
                        <div className="media-body panel panel-default">
                            <div className="panel-heading">
                                <abbr title={new Date(issue.updated_at).toLocaleString()}>
                                    {new Date(issue.updated_at).toLocaleDateString('zh-CN')}
                                </abbr>{' '}
                                更新
                            </div>
                            <div
                                className="panel-body"
                                innerHTML={issue.body?.replace(/\n/g, '<br>') || '无描述'}
                            />
                        </div>
                    </section>

                    {/* Comments */}
                    {issueComments.length > 0 && (
                        <div>
                            <h4>评论 ({issueComments.length})</h4>
                            {issueComments.map(this.renderComment)}
                        </div>
                    )}
                </div>

                <aside className="col-md-3">
                    <h4>指派</h4>
                    <div>
                        {issue.assignees && issue.assignees.length > 0 ? (
                            issue.assignees.map(assignee => (
                                <a
                                    key={assignee.id}
                                    href={`#/users/${assignee.login}`}
                                    title={assignee.login}
                                >
                                    <img
                                        className="img-thumbnail"
                                        src={assignee.avatar_url}
                                        style={{ width: '40px', height: '40px' }}
                                        alt={assignee.login}
                                    />
                                </a>
                            ))
                        ) : (
                            <span>无人指派</span>
                        )}
                    </div>
                    <hr />
                    <h4>标签</h4>
                    <div>
                        {issue.labels && issue.labels.length > 0 ? (
                            issue.labels.map(
                                label =>
                                    typeof label === 'object' && (
                                        <i
                                            key={label.id}
                                            className="label"
                                            style={{ background: `#${label.color}` }}
                                        >
                                            {label.name}
                                        </i>
                                    )
                            )
                        ) : (
                            <span>无标签</span>
                        )}
                    </div>
                    <hr />
                    <h4>里程碑</h4>
                    <div>
                        {issue.milestone ? (
                            <a
                                href={`#/repos/${this.owner}/${this.repo}/milestones/${issue.milestone.number}`}
                            >
                                {issue.milestone.title}
                            </a>
                        ) : (
                            <span>未设置</span>
                        )}
                    </div>
                </aside>
            </div>
        );
    }
}
