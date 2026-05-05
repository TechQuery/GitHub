import { observable } from 'mobx';
import { type IssueComment, IssueCommentModel, IssueModel } from 'mobx-github';
import { attribute, component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { Link } from '../stores/router';

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

    @observable
    accessor issueStore: IssueModel | null = null;

    @observable
    accessor commentStore: IssueCommentModel | null = null;

    mountedCallback() {
        if (!this.owner || !this.repo || !this.issueNumber) return;

        const issue = parseInt(this.issueNumber, 10);

        this.issueStore = new IssueModel(this.owner, this.repo);
        this.commentStore = new IssueCommentModel(this.owner, this.repo, issue);

        this.issueStore.getOne(issue);
        this.commentStore.getList();
    }

    renderComment = ({ id, user, body, created_at, updated_at }: IssueComment) => (
        <section key={id} className="media">
            <div className="media-left text-center">
                <Link to={`/users/${user!.login}`} title={user!.login}>
                    <img
                        className="media-object"
                        src={user!.avatar_url}
                        width={50}
                        height={50}
                        alt={user!.login}
                    />
                    <div className="ellipsis">{user!.login}</div>
                </Link>
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
        const issue = this.issueStore?.currentOne;
        const issueComments = this.commentStore?.allItems ?? [];
        const downloading =
            (this.issueStore?.downloading ?? 0) + (this.commentStore?.downloading ?? 0);

        if (downloading > 0) return <Loading />;

        if (!issue?.user) return <div>问题不存在</div>;

        return (
            <div className="row">
                <div className="col-md-9">
                    <h3>
                        #{issue.number} {issue.title}
                        <span
                            className={`label label-${issue.state === 'open' ? 'success' : 'danger'}`}
                        >
                            {issue.state === 'open' ? '开启' : '关闭'}
                        </span>
                    </h3>

                    {/* Original Issue */}
                    <section className="media">
                        <div className="media-left text-center">
                            <Link to={`/users/${issue.user!.login}`} title={issue.user!.login}>
                                <img
                                    className="media-object"
                                    src={issue.user!.avatar_url}
                                    width={50}
                                    height={50}
                                    alt={issue.user!.login}
                                />
                                <div className="ellipsis">{issue.user!.login}</div>
                            </Link>
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
                                <Link
                                    key={assignee.id}
                                    to={`/users/${assignee.login}`}
                                    title={assignee.login}
                                >
                                    <img
                                        className="img-thumbnail"
                                        src={assignee.avatar_url}
                                        width={40}
                                        height={40}
                                        alt={assignee.login}
                                    />
                                </Link>
                            ))
                        ) : (
                            <span>无人指派</span>
                        )}
                    </div>
                    <hr />
                    <h4>标签</h4>
                    <div>
                        {issue.labels[0] ? (
                            issue.labels.map(label =>
                                typeof label === 'string' ? (
                                    <i key={label} className="label label-default">
                                        {label}
                                    </i>
                                ) : (
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
                            <Link
                                to={`/repos/${this.owner}/${this.repo}/milestones/${issue.milestone.number}`}
                            >
                                {issue.milestone.title}
                            </Link>
                        ) : (
                            <span>未设置</span>
                        )}
                    </div>
                </aside>
            </div>
        );
    }
}
