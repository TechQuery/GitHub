import './components/NavBar';
import './components/PageContent';
import { router } from './stores/router';

// Simple custom element without decorators for now
class GitHubApp extends HTMLElement {
  connectedCallback() {
    // Initialize routing first
    router.init();
    
    this.innerHTML = `
      <nav-bar></nav-bar>
      <div class="container" id="PageBox">
        <page-content></page-content>
      </div>
    `;
  }
}

// Register the custom element
customElements.define('github-app', GitHubApp);