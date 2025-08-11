import './components/NavBar';
import './stores/router';

// Simple custom element without decorators for now
class GitHubApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav-bar></nav-bar>
      <div class="container" id="PageBox">
        <div>Page content will go here</div>
      </div>
    `;
  }
}

// Register the custom element
customElements.define('github-app', GitHubApp);