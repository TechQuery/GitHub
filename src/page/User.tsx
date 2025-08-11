import { component, observer } from 'web-cell';
import { githubStore } from '../stores/github';

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
    const { currentUser: user, loading } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
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
              <img src={user.avatar_url} className="img-circle" width={150} height={150} alt={user.login} />
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