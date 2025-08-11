import { component, observer } from 'web-cell';
import { githubStore } from '../stores/github';

@component({
  tagName: 'events-page'
})
@observer
export class EventsPage extends HTMLElement {
  mountedCallback() {
    githubStore.fetchEvents();
  }

  render() {
    const { events, loading } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h2>GitHub 事件流 (G 流)</h2>
          <div className="panel panel-default">
            <div className="panel-body">
              {events.length === 0 ? (
                <p>加载中...</p>
              ) : (
                events.map(event => (
                  <div className="media" style={{"borderBottom": "1px solid #eee", "padding": "15px 0"}}>
                    <div className="media-left">
                      <img src={event.actor.avatar_url} className="media-object img-circle" width={40} height={40} alt={event.actor.login} />
                    </div>
                    <div className="media-body">
                      <h5 className="media-heading">
                        <a href={`#/users/${event.actor.login}`}>{event.actor.login}</a>
                        {' ' + event.type}
                        <small className="text-muted">{new Date(event.created_at).toLocaleString()}</small>
                      </h5>
                      <p>仓库: <strong>{event.repo.name}</strong></p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}