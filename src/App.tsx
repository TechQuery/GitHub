import { component, observer } from 'web-cell';
import { CellRouter } from 'cell-router';
import { NavBar } from './components/NavBar';
import { HomePage } from './page/Home';
import { UsersPage } from './page/Users';
import { UserPage } from './page/User';
import { ReposPage } from './page/Repos';
import { RepoPage } from './page/Repo';
import { EventsPage } from './page/Events';
import { GistsPage } from './page/Gists';

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