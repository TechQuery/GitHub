import { component, observer } from 'web-cell';
import { githubStore } from '../stores/github';

@component({
  tagName: 'home-page'
})
export class HomePage extends HTMLElement {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="jumbotron">
            <h1>GitHub 中文版</h1>
            <p>基于 WebCell v3 重写的现代化 GitHub 浏览器</p>
            <p>
              <a className="btn btn-primary btn-lg" href="#/events" role="button">查看 G 流</a>
              <a className="btn btn-success btn-lg" href="#/repos" role="button">浏览 G 仓</a>
              <a className="btn btn-info btn-lg" href="#/users" role="button">发现 G 友</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

@component({
  tagName: 'users-page'
})
@observer
export class UsersPage extends HTMLElement {
  mountedCallback() {
    githubStore.fetchUsers();
  }

  render() {
    const { users, loading, error } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          <strong>错误:</strong> {error}
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h2>GitHub 用户 (G 友)</h2>
          <div className="row">
            {users.map(user => (
              <div className="col-md-4 col-sm-6">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img src={user.avatar_url} className="img-circle" width="64" height="64" alt={user.login} />
                    <h4><a href={`#/users/${user.login}`}>{user.login}</a></h4>
                    <p><small>ID: {user.id}</small></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

@component({
  tagName: 'user-page'
})
@observer
export class UserPage extends HTMLElement {
  mountedCallback() {
    // Get username from the URL hash
    const hash = location.hash;
    const match = hash.match(/\/users\/([^\/]+)/);
    if (match) {
      githubStore.fetchUser(match[1]);
    }
  }

  render() {
    const { currentUser: user, loading, error } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          <strong>错误:</strong> {error}
        </div>
      );
    }

    if (!user) {
      return <div>用户不存在</div>;
    }

    return (
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body text-center">
              <img src={user.avatar_url} className="img-circle" width="150" height="150" alt={user.login} />
              <h3>{user.name || user.login}</h3>
              <p className="text-muted">@{user.login}</p>
              {user.bio && <p>{user.bio}</p>}
              <div className="row">
                <div className="col-xs-4">
                  <strong>{user.public_repos}</strong><br/>
                  <small>仓库</small>
                </div>
                <div className="col-xs-4">
                  <strong>{user.followers}</strong><br/>
                  <small>关注者</small>
                </div>
                <div className="col-xs-4">
                  <strong>{user.following}</strong><br/>
                  <small>关注</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h3>用户信息</h3>
          <div className="panel panel-default">
            <div className="panel-body">
              {user.company && <p><strong>公司:</strong> {user.company}</p>}
              {user.location && <p><strong>位置:</strong> {user.location}</p>}
              <p><strong>GitHub:</strong> <a href={user.html_url} target="_blank">{user.html_url}</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

@component({
  tagName: 'repos-page'
})
@observer
export class ReposPage extends HTMLElement {
  mountedCallback() {
    githubStore.fetchRepositories();
  }

  render() {
    const { repositories, loading, error } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          <strong>错误:</strong> {error}
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h2>GitHub 仓库 (G 仓)</h2>
          <div className="list-group">
            {repositories.map(repo => (
              <a href={`#/repos/${repo.full_name}`} className="list-group-item">
                <h4 className="list-group-item-heading">{repo.full_name}</h4>
                <p className="list-group-item-text">{repo.description || '无描述'}</p>
                <span className="badge">{repo.stargazers_count} ⭐</span>
                {repo.language && <span className="badge">{repo.language}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

@component({
  tagName: 'repo-page'
})
@observer
export class RepoPage extends HTMLElement {
  mountedCallback() {
    // Get owner and repo from the URL hash
    const hash = location.hash;
    const match = hash.match(/\/repos\/([^\/]+)\/([^\/]+)/);
    if (match) {
      githubStore.fetchRepository(match[1], match[2]);
    }
  }

  render() {
    const { currentRepo: repo, loading, error } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          <strong>错误:</strong> {error}
        </div>
      );
    }

    if (!repo) {
      return <div>仓库不存在</div>;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h2>{repo.full_name}</h2>
          <p className="lead">{repo.description || '无描述'}</p>
          
          <div className="row">
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-xs-3 text-center">
                      <strong>{repo.stargazers_count}</strong><br/>
                      <small>Stars</small>
                    </div>
                    <div className="col-xs-3 text-center">
                      <strong>{repo.forks_count}</strong><br/>
                      <small>Forks</small>
                    </div>
                    <div className="col-xs-3 text-center">
                      <strong>{repo.language || 'N/A'}</strong><br/>
                      <small>语言</small>
                    </div>
                    <div className="col-xs-3 text-center">
                      <a href={repo.html_url} target="_blank" className="btn btn-primary btn-sm">查看仓库</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">仓库所有者</div>
                <div className="panel-body text-center">
                  <img src={repo.owner.avatar_url} className="img-circle" width="64" height="64" alt={repo.owner.login} />
                  <h4><a href={`#/users/${repo.owner.login}`}>{repo.owner.login}</a></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

@component({
  tagName: 'events-page'
})
@observer
export class EventsPage extends HTMLElement {
  mountedCallback() {
    githubStore.fetchEvents();
  }

  render() {
    const { events, loading, error } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          <strong>错误:</strong> {error}
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
                  <div className="media" style="border-bottom: 1px solid #eee; padding: 15px 0;">
                    <div className="media-left">
                      <img src={event.actor.avatar_url} className="media-object img-circle" width="40" height="40" alt={event.actor.login} />
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

@component({
  tagName: 'gists-page'
})
export class GistsPage extends HTMLElement {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>GitHub Gists (G 锦)</h2>
          <div className="alert alert-info">
            <p>Gist 功能正在开发中...</p>
          </div>
        </div>
      </div>
    );
  }
}