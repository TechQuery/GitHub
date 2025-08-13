import { observable } from 'mobx';
import { attribute, component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { githubStore } from '../stores/github';

@component({ tagName: 'milestone-page' })
@observer
export default class MilestonePage extends HTMLElement {
    @observable
    @attribute
    accessor owner = '';

    @observable
    @attribute
    accessor repo = '';

    @observable
    @attribute
    accessor milestoneNumber = '';

    mountedCallback() {
        if (this.owner && this.repo && this.milestoneNumber) {
            const milestoneNum = parseInt(this.milestoneNumber, 10);
            githubStore.fetchMilestone(this.owner, this.repo, milestoneNum);
        }
    }

    render() {
        const { currentMilestone: milestone, downloading } = githubStore;

        if (downloading > 0) return <Loading />;
        if (!milestone) return <div>里程碑不存在</div>;

        const totalIssues = milestone.open_issues + milestone.closed_issues;
        const progressPercentage =
            totalIssues > 0 ? (milestone.closed_issues / totalIssues) * 100 : 0;

        return (
            <div className="row">
                <div className="col-md-12">
                    <blockquote className="media">
                        <div className="media-body">
                            <h3 className="media-heading">
                                {milestone.title}
                                <span
                                    className={`label label-${
                                        milestone.state === 'open' ? 'success' : 'danger'
                                    }`}
                                >
                                    {milestone.state === 'open' ? '开启' : '关闭'}
                                </span>
                            </h3>
                            {milestone.description && <div>{milestone.description}</div>}
                            <div className="table-row">
                                <small>
                                    {new Date(milestone.created_at).toLocaleDateString('zh-CN')}{' '}
                                    创建
                                </small>
                                <small>
                                    {new Date(milestone.updated_at).toLocaleDateString('zh-CN')}{' '}
                                    更新
                                </small>
                                {milestone.due_on && (
                                    <small>
                                        {new Date(milestone.due_on).toLocaleDateString('zh-CN')}{' '}
                                        过期
                                    </small>
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="progress" style={{ marginTop: '15px' }}>
                                <div
                                    className="progress-bar progress-bar-success"
                                    role="progressbar"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    {milestone.closed_issues} / {totalIssues} 已完成
                                </div>
                            </div>

                            <div className="table-row" style={{ marginTop: '10px' }}>
                                <span>
                                    <strong>{milestone.closed_issues}</strong> 已关闭
                                </span>
                                <span>
                                    <strong>{milestone.open_issues}</strong> 未完成
                                </span>
                            </div>
                        </div>
                        <div className="media-right media-middle">
                            {milestone.creator && (
                                <a
                                    href={`#/users/${milestone.creator.login}`}
                                    title={milestone.creator.login}
                                >
                                    <img
                                        className="media-object"
                                        src={milestone.creator.avatar_url}
                                        style={{ width: '64px', height: '64px' }}
                                        alt={milestone.creator.login}
                                    />
                                    <div className="ellipsis">{milestone.creator.login}</div>
                                </a>
                            )}
                        </div>
                    </blockquote>

                    {/* Links */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-group" role="group">
                                <a
                                    href={`#/repos/${this.owner}/${this.repo}/issues`}
                                    className="btn btn-default"
                                >
                                    查看所有问题
                                </a>
                                <a
                                    href={milestone.html_url}
                                    target="_blank"
                                    className="btn btn-primary"
                                    rel="noreferrer"
                                >
                                    在 GitHub 上查看
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
