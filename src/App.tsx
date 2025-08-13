import { CellRouter } from 'cell-router';
import { component, lazy, observer } from 'web-cell';

import { NavBar } from './components/NavBar';
import { HomePage } from './page/Home';

@component({ tagName: 'github-app' })
@observer
export class GitHubApp extends HTMLElement {
    private routes = [
        { path: '#', component: HomePage },
        { path: '#users', component: lazy(() => import('./page/Users')) },
        { path: '#users/:username', component: lazy(() => import('./page/User')) },
        { path: '#repos', component: lazy(() => import('./page/Repos')) },
        { path: '#repos/:owner/:repo', component: lazy(() => import('./page/Repo')) },
        { path: '#repos/:owner/:repo/issues/:issueNumber', component: lazy(() => import('./page/Issue')) },
        { path: '#repos/:owner/:repo/milestones/:milestoneNumber', component: lazy(() => import('./page/Milestone')) },
        { path: '#events', component: lazy(() => import('./page/Events')) },
        { path: '#gists', component: lazy(() => import('./page/Gists')) },
        { path: '#gists/:gistId', component: lazy(() => import('./page/Gist')) }
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
