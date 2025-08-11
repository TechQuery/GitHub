import { component, observer } from 'web-cell';

import { githubStore } from '../stores/github';

@component({
  tagName: 'repos-page'
})
@observer
export class ReposPage extends HTMLElement {
  mountedCallback() {
    githubStore.fetchRepositories();
  }

  render() {
    const { repositories, downloading } = githubStore;

    if (downloading > 0) {
      return (
        <div className="text-center">
          <div className="spinner">加载中...</div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h2>GitHub 仓库 (G 仓)</h2>
          <div className="list-group">
            {repositories.map(({ full_name, description, stargazers_count, language, id }) => (
              <a key={id} href={`#/repos/${full_name}`} className="list-group-item">
                <h4 className="list-group-item-heading">{full_name}</h4>
                <p className="list-group-item-text">{description || '无描述'}</p>
                <span className="badge">{stargazers_count} ⭐</span>
                {language && <span className="badge">{language}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}