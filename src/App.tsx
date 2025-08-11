import { component, observer } from 'web-cell';
import { CellRouter } from 'cell-router';
import { NavBar } from './components/NavBar';
import { HomePage } from './page/Home';
import { createLazyComponent } from './components/LazyLoader';

@component({
  tagName: 'github-app'
})
@observer
export class GitHubApp extends HTMLElement {
  private routes = [
    { path: '/', component: HomePage },
    { path: '/users', component: createLazyComponent(() => import('./page/Users').then(m => m.UsersPage)) },
    { path: '/users/:username', component: createLazyComponent(() => import('./page/User').then(m => m.UserPage)) },
    { path: '/repos', component: createLazyComponent(() => import('./page/Repos').then(m => m.ReposPage)) },
    { path: '/repos/:owner/:repo', component: createLazyComponent(() => import('./page/Repo').then(m => m.RepoPage)) },
    { path: '/events', component: createLazyComponent(() => import('./page/Events').then(m => m.EventsPage)) },
    { path: '/gists', component: createLazyComponent(() => import('./page/Gists').then(m => m.GistsPage)) }
  ];

  render() {
    return (
      <>
        <NavBar />
        <div className="container" id="PageBox">
          <CellRouter routes={this.routes} />
        </div>
      </>
    );
  }
}