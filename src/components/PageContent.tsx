import { githubStore } from '../stores/github';
import { router } from '../stores/router';

class PageContent extends HTMLElement {
  private observer: any;

  connectedCallback() {
    // Set up MobX observer to re-render when stores change
    this.setupObserver();
    this.render();
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.dispose();
    }
  }

  private setupObserver() {
    // Listen for hash changes and router updates
    const updatePage = () => {
      setTimeout(() => this.render(), 200); // Give time for router and data loading
    };
    
    window.addEventListener('hashchange', updatePage);
    
    // Also set up a periodic check for data updates
    setInterval(() => {
      // Check if we need to re-render based on loading state changes
      const shouldUpdate = this.lastLoadingState !== githubStore.loading || 
                          this.lastErrorState !== githubStore.error;
      if (shouldUpdate) {
        this.render();
        this.lastLoadingState = githubStore.loading;
        this.lastErrorState = githubStore.error;
      }
    }, 500);
  }

  private lastLoadingState = false;
  private lastErrorState: string | null = null;

  render() {
    const pageType = router.currentPageType;
    const loading = githubStore.loading;
    const error = githubStore.error;

    if (loading) {
      this.innerHTML = `
        <div class="text-center">
          <div class="spinner">加载中...</div>
        </div>
      `;
      return;
    }

    if (error) {
      this.innerHTML = `
        <div class="alert alert-danger">
          <strong>错误:</strong> ${error}
        </div>
      `;
      return;
    }

    switch (pageType) {
      case 'home':
        this.renderHome();
        break;
      case 'users':
        this.renderUsersList();
        break;
      case 'user':
        this.renderUserDetail();
        break;
      case 'repos':
        this.renderReposList();
        break;
      case 'repo':
        this.renderRepoDetail();
        break;
      case 'events':
        this.renderEvents();
        break;
      case 'gists':
        this.renderGists();
        break;
      default:
        this.renderHome();
    }
  }

  private renderHome() {
    this.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <div class="jumbotron">
            <h1>GitHub 中文版</h1>
            <p>基于 WebCell v3 重写的现代化 GitHub 浏览器</p>
            <p>
              <a class="btn btn-primary btn-lg" href="#/events" role="button">查看 G 流</a>
              <a class="btn btn-success btn-lg" href="#/repos" role="button">浏览 G 仓</a>
              <a class="btn btn-info btn-lg" href="#/users" role="button">发现 G 友</a>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private renderUsersList() {
    const users = githubStore.users;
    this.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <h2>GitHub 用户 (G 友)</h2>
          <div class="row">
            ${users.map(user => `
              <div class="col-md-4 col-sm-6">
                <div class="panel panel-default">
                  <div class="panel-body text-center">
                    <img src="${user.avatar_url}" class="img-circle" width="64" height="64" alt="${user.login}">
                    <h4><a href="#/users/${user.login}">${user.login}</a></h4>
                    <p><small>ID: ${user.id}</small></p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private renderUserDetail() {
    const user = githubStore.currentUser;
    if (!user) return;

    this.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <div class="panel panel-default">
            <div class="panel-body text-center">
              <img src="${user.avatar_url}" class="img-circle" width="150" height="150" alt="${user.login}">
              <h3>${user.name || user.login}</h3>
              <p class="text-muted">@${user.login}</p>
              ${user.bio ? `<p>${user.bio}</p>` : ''}
              <div class="row">
                <div class="col-xs-4">
                  <strong>${user.public_repos}</strong><br>
                  <small>仓库</small>
                </div>
                <div class="col-xs-4">
                  <strong>${user.followers}</strong><br>
                  <small>关注者</small>
                </div>
                <div class="col-xs-4">
                  <strong>${user.following}</strong><br>
                  <small>关注</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h3>用户信息</h3>
          <div class="panel panel-default">
            <div class="panel-body">
              ${user.company ? `<p><strong>公司:</strong> ${user.company}</p>` : ''}
              ${user.location ? `<p><strong>位置:</strong> ${user.location}</p>` : ''}
              <p><strong>GitHub:</strong> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderReposList() {
    const repos = githubStore.repositories;
    this.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <h2>GitHub 仓库 (G 仓)</h2>
          <div class="list-group">
            ${repos.map(repo => `
              <a href="#/repos/${repo.full_name}" class="list-group-item">
                <h4 class="list-group-item-heading">${repo.full_name}</h4>
                <p class="list-group-item-text">${repo.description || '无描述'}</p>
                <span class="badge">${repo.stargazers_count} ⭐</span>
                ${repo.language ? `<span class="badge">${repo.language}</span>` : ''}
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private renderRepoDetail() {
    const repo = githubStore.currentRepo;
    if (!repo) return;

    this.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <h2>${repo.full_name}</h2>
          <p class="lead">${repo.description || '无描述'}</p>
          
          <div class="row">
            <div class="col-md-8">
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="row">
                    <div class="col-xs-3 text-center">
                      <strong>${repo.stargazers_count}</strong><br>
                      <small>Stars</small>
                    </div>
                    <div class="col-xs-3 text-center">
                      <strong>${repo.forks_count}</strong><br>
                      <small>Forks</small>
                    </div>
                    <div class="col-xs-3 text-center">
                      <strong>${repo.language || 'N/A'}</strong><br>
                      <small>语言</small>
                    </div>
                    <div class="col-xs-3 text-center">
                      <a href="${repo.html_url}" target="_blank" class="btn btn-primary btn-sm">查看仓库</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="panel panel-default">
                <div class="panel-heading">仓库所有者</div>
                <div class="panel-body text-center">
                  <img src="${repo.owner.avatar_url}" class="img-circle" width="64" height="64" alt="${repo.owner.login}">
                  <h4><a href="#/users/${repo.owner.login}">${repo.owner.login}</a></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderEvents() {
    const events = githubStore.events;
    this.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <h2>GitHub 事件流 (G 流)</h2>
          <div class="panel panel-default">
            <div class="panel-body">
              ${events.length === 0 ? '<p>加载中...</p>' : events.map(event => `
                <div class="media" style="border-bottom: 1px solid #eee; padding: 15px 0;">
                  <div class="media-left">
                    <img src="${event.actor.avatar_url}" class="media-object img-circle" width="40" height="40" alt="${event.actor.login}">
                  </div>
                  <div class="media-body">
                    <h5 class="media-heading">
                      <a href="#/users/${event.actor.login}">${event.actor.login}</a>
                      ${event.type}
                      <small class="text-muted">${new Date(event.created_at).toLocaleString()}</small>
                    </h5>
                    <p>仓库: <strong>${event.repo.name}</strong></p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderGists() {
    this.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <h2>GitHub Gists (G 锦)</h2>
          <div class="alert alert-info">
            <p>Gist 功能正在开发中...</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('page-content', PageContent);