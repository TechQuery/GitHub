import { action, observable } from 'mobx';
import { BaseModel, toggle } from 'mobx-restful';

// Use simpler types for compatibility
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
  payload: Record<string, unknown>;
}

export class GitHubStore extends BaseModel {
  @observable accessor users: GitHubUser[] = [];
  @observable accessor repositories: GitHubRepo[] = [];
  @observable accessor events: GitHubEvent[] = [];
  @observable accessor currentUser: GitHubUser | null = null;
  @observable accessor currentRepo: GitHubRepo | null = null;

  private async fetchData(endpoint: string) {
    const response = await fetch(`https://api.github.com${endpoint}`, {
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
  @toggle('downloading')
  async fetchUser(username: string) {
    const user = await this.fetchData(`/users/${username}`);
    this.currentUser = user;
    return user;
  }

  @action
  @toggle('downloading')
  async fetchRepository(owner: string, repo: string) {
    const repository = await this.fetchData(`/repos/${owner}/${repo}`);
    this.currentRepo = repository;
    return repository;
  }

  @action
  @toggle('downloading')
  async fetchUsers() {
    // Fetch TechQuery user as demo data
    const techQueryUser = await this.fetchData(`/users/TechQuery`);
    this.users = [techQueryUser];
    return this.users;
  }

  @action
  @toggle('downloading')
  async fetchRepositories(page = 1) {
    // Fetch EasyWebApp organization repositories as demo data
    const repos = await this.fetchData(`/orgs/EasyWebApp/repos?per_page=30&page=${page}`);
    this.repositories = repos;
    return repos;
  }

  @action
  @toggle('downloading')
  async fetchEvents(page = 1) {
    // Fetch TechQuery user's public events as demo data
    const events = await this.fetchData(`/users/TechQuery/events/public?per_page=30&page=${page}`);
    this.events = events;
    return events;
  }

  @action
  @toggle('downloading')
  async searchUsers(query: string) {
    const { items } = await this.fetchData(`/search/users?q=${encodeURIComponent(query)}&per_page=30`);
    this.users = items;
    return items;
  }

  @action
  @toggle('downloading')
  async searchRepositories(query: string) {
    const { items } = await this.fetchData(`/search/repositories?q=${encodeURIComponent(query)}&per_page=30`);
    this.repositories = items;
    return items;
  }
}

export const githubStore = new GitHubStore();