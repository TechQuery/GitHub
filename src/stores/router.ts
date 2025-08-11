import { observable, action } from 'mobx';
import { githubStore } from './github';

export class Router {
  @observable
  currentRoute = '/';

  @observable 
  params: Record<string, string> = {};

  @observable
  currentPageType: 'home' | 'users' | 'user' | 'repos' | 'repo' | 'events' | 'gists' | 'about' = 'home';

  @action
  navigate(route: string, params: Record<string, string> = {}) {
    this.currentRoute = route;
    this.params = params;
    window.location.hash = `#${route}`;
    this.handleRouteChange();
  }

  @action
  init() {
    // Initialize from current hash
    this.parseHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', this.parseHash);
  }

  @action
  parseHash = () => {
    const hash = window.location.hash.slice(1) || '/';
    const [route, queryString] = hash.split('?');
    
    this.currentRoute = route;
    
    // Parse query parameters
    const params: Record<string, string> = {};
    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key && value) {
          params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
      });
    }
    this.params = params;
    this.handleRouteChange();
  };

  @action
  private handleRouteChange() {
    const route = this.currentRoute;
    
    // Determine page type and load data
    if (route === '/' || route === '') {
      this.currentPageType = 'home';
    } else if (route.startsWith('/users/') && route.split('/').length === 3) {
      this.currentPageType = 'user';
      const username = route.split('/')[2];
      githubStore.fetchUser(username);
    } else if (route.startsWith('/users')) {
      this.currentPageType = 'users';
      githubStore.fetchUsers();
    } else if (route.startsWith('/repos/') && route.split('/').length === 4) {
      this.currentPageType = 'repo';
      const [, , owner, repo] = route.split('/');
      githubStore.fetchRepository(owner, repo);
    } else if (route.startsWith('/repos')) {
      this.currentPageType = 'repos';
      githubStore.fetchRepositories();
    } else if (route.startsWith('/events')) {
      this.currentPageType = 'events';
      githubStore.fetchEvents();
    } else if (route.startsWith('/gists')) {
      this.currentPageType = 'gists';
    } else {
      this.currentPageType = 'about';
    }
  }
}

export const router = new Router();