import { GitHubApp } from './App';

// Mount the app component to body - correct WebCell v3 pattern
const app = document.createElement('github-app') as GitHubApp;
document.body.appendChild(app);