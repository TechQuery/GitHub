import { component, observer } from 'web-cell';
import { CellRouter } from 'cell-router';
import { NavBar } from './components/NavBar';
import { HomePage, UsersPage, UserPage, ReposPage, RepoPage, EventsPage, GistsPage } from './components/Pages';

@component({
  tagName: 'github-app'
})
@observer
export class GitHubApp extends HTMLElement {
  private routes = [
    { path: '/', component: HomePage },
    { path: '/users', component: UsersPage },
    { path: '/users/:username', component: UserPage },
    { path: '/repos', component: ReposPage },
    { path: '/repos/:owner/:repo', component: RepoPage },
    { path: '/events', component: EventsPage },
    { path: '/gists', component: GistsPage }
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