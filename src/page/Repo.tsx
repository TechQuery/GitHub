import { component, observer } from 'web-cell';
import { githubStore } from '../stores/github';

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
    const { currentRepo: repo, loading } = githubStore;

    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
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
                  <img src={repo.owner.avatar_url} className="img-circle" width={64} height={64} alt={repo.owner.login} />
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