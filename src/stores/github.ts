import { observable, action } from 'mobx';

// GitHub API base configuration
const GITHUB_API_BASE = 'https://api.github.com';

// Use simplified interfaces instead of complex Octokit types
interface GitHubUser {
  id: number;
  login: string;
  name?: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
  company?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description?: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  updated_at: string;
  owner: GitHubUser;
}

interface GitHubEvent {
  id: string;
  type: string;
  actor: GitHubUser;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: any;
}

export class GitHubStore {
  @observable accessor users: GitHubUser[] = [];
  @observable accessor repositories: GitHubRepo[] = [];
  @observable accessor events: GitHubEvent[] = [];
  @observable accessor currentUser: GitHubUser | null = null;
  @observable accessor currentRepo: GitHubRepo | null = null;
  @observable accessor loading = false;

  private async fetchData(endpoint: string) {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  @action
  async fetchUser(username: string) {
    this.loading = true;
    const user = await this.fetchData(`/users/${username}`);
    this.currentUser = user;
    this.loading = false;
    return user;
  }

  @action
  async fetchRepository(owner: string, repo: string) {
    this.loading = true;
    const repository = await this.fetchData(`/repos/${owner}/${repo}`);
    this.currentRepo = repository;
    this.loading = false;
    return repository;
  }

  @action
  async fetchUsers() {
    this.loading = true;
    // Fetch TechQuery user as demo data
    const techQueryUser = await this.fetchData(`/users/TechQuery`);
    this.users = [techQueryUser];
    this.loading = false;
    return this.users;
  }

  @action
  async fetchRepositories(page = 1) {
    this.loading = true;
    // Fetch EasyWebApp organization repositories as demo data
    const repos = await this.fetchData(`/orgs/EasyWebApp/repos?per_page=30&page=${page}`);
    this.repositories = repos;
    this.loading = false;
    return repos;
  }

  @action
  async fetchEvents(page = 1) {
    this.loading = true;
    // Fetch TechQuery user's public events as demo data
    const events = await this.fetchData(`/users/TechQuery/events/public?per_page=30&page=${page}`);
    this.events = events;
    this.loading = false;
    return events;
  }

  @action
  async searchUsers(query: string) {
    this.loading = true;
    const result = await this.fetchData(`/search/users?q=${encodeURIComponent(query)}&per_page=30`);
    this.users = result.items;
    this.loading = false;
    return result.items;
  }

  @action
  async searchRepositories(query: string) {
    this.loading = true;
    const result = await this.fetchData(`/search/repositories?q=${encodeURIComponent(query)}&per_page=30`);
    this.repositories = result.items;
    this.loading = false;
    return result.items;
  }
}

export const githubStore = new GitHubStore();