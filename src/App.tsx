import { component, observer, lazy } from 'web-cell';
import { CellRouter } from 'cell-router';
import { NavBar } from './components/NavBar';
import { HomePage } from './page/Home';

@component({
  tagName: 'github-app'
})
@observer
export class GitHubApp extends HTMLElement {
  private routes = [
    { path: '/', component: HomePage },
    { path: '/users', component: lazy(() => import('./page/Users').then(m => ({ default: m.UsersPage }))) },
    { path: '/users/:username', component: lazy(() => import('./page/User').then(m => ({ default: m.UserPage }))) },
    { path: '/repos', component: lazy(() => import('./page/Repos').then(m => ({ default: m.ReposPage }))) },
    { path: '/repos/:owner/:repo', component: lazy(() => import('./page/Repo').then(m => ({ default: m.RepoPage }))) },
    { path: '/events', component: lazy(() => import('./page/Events').then(m => ({ default: m.EventsPage }))) },
    { path: '/gists', component: lazy(() => import('./page/Gists').then(m => ({ default: m.GistsPage }))) }
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