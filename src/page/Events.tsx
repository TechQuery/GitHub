import { component, observer } from 'web-cell';

import { Loading } from '../components/Loading';
import { GitHubEvent,githubStore } from '../stores/github';

@component({ tagName: 'events-page' })
@observer
export default class EventsPage extends HTMLElement {
    mountedCallback() {
        githubStore.fetchEvents();
    }

    renderEventItem = ({ id, type, actor, repo, created_at }: GitHubEvent) => (
        <div
            key={id}
            className="media"
            style={{
                borderBottom: '1px solid #eee',
                padding: '15px 0'
            }}
        >
            <div className="media-left">
                <img
                    src={actor.avatar_url}
                    className="media-object img-circle"
                    width={40}
                    height={40}
                    alt={actor.login}
                />
            </div>
            <div className="media-body">
                <h5 className="media-heading">
                    <a href={`#/users/${actor.login}`}>{actor.login}</a>
                    {' ' + type}
                    <small className="text-muted">
                        {new Date(created_at || '').toLocaleString()}
                    </small>
                </h5>
                <p>
                    仓库: <strong>{repo.name}</strong>
                </p>
            </div>
        </div>
    );

    render() {
        const { events, downloading } = githubStore;

        if (downloading > 0) return <Loading />;

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>GitHub 事件流 (G 流)</h2>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {events.map(this.renderEventItem)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
