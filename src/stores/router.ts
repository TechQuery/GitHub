import { observable, action } from 'mobx';

export class Router {
  @observable
  currentRoute = '/';

  @observable 
  params: Record<string, string> = {};

  @action
  navigate(route: string, params: Record<string, string> = {}) {
    this.currentRoute = route;
    this.params = params;
    window.location.hash = `#${route}`;
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
  };
}

export const router = new Router();