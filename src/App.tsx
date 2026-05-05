import { lazy } from 'web-cell';

import { NavBar } from './components/NavBar';
import { HomePage } from './page/Home';
import { Route, Router } from './stores/router';

export const GitHubApp = () => (
    <m3e-theme color="#1565C0" scheme="auto" motion="expressive">
        <NavBar />
        <main id="PageBox" className="container py-3">
            <Router>
                <Route path="" component={HomePage} />
                <Route path="/users" component={lazy(() => import('./page/Users'))} />
                <Route path="/users/:username" component={lazy(() => import('./page/User'))} />
                <Route path="/repos" component={lazy(() => import('./page/Repos'))} />
                <Route path="/repos/:owner/:repo" component={lazy(() => import('./page/Repo'))} />
                <Route
                    path="/repos/:owner/:repo/issues/:issueNumber"
                    component={lazy(() => import('./page/Issue'))}
                />
                <Route
                    path="/repos/:owner/:repo/milestones/:milestoneNumber"
                    component={lazy(() => import('./page/Milestone'))}
                />
                <Route path="/events" component={lazy(() => import('./page/Events'))} />
                <Route path="/gists" component={lazy(() => import('./page/Gists'))} />
                <Route path="/gists/:gistId" component={lazy(() => import('./page/Gist'))} />
            </Router>
        </main>
    </m3e-theme>
);
