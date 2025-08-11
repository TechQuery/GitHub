import { component, observer } from 'web-cell';
import { githubStore } from '../stores/github';

@component({
  tagName: 'users-page'
})
@observer
export class UsersPage extends HTMLElement {
  mountedCallback() {
    githubStore.fetchUsers();
  }

  render() {
    const { users, loading } = githubStore;

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
          <h2>GitHub 用户 (G 友)</h2>
          <div className="row">
            {users.map(({ avatar_url, login, id }) => (
              <div className="col-md-4 col-sm-6">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img src={avatar_url} className="img-circle" width={64} height={64} alt={login} />
                    <h4><a href={`#/users/${login}`}>{login}</a></h4>
                    <p><small>ID: {id}</small></p>
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