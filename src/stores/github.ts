import { observable, action, runInAction } from 'mobx';

// GitHub API base configuration
const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubUser {
  id: number;
  login: string;
  name: string;
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
  @observable
  users: GitHubUser[] = [];

  @observable
  repositories: GitHubRepo[] = [];

  @observable
  events: GitHubEvent[] = [];

  @observable
  currentUser: GitHubUser | null = null;

  @observable
  currentRepo: GitHubRepo | null = null;

  @observable
  loading = false;

  @observable
  error: string | null = null;

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers,
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
    this.error = null;

    try {
      const user = await this.fetch(`/users/${username}`);
      
      runInAction(() => {
        this.currentUser = user;
        this.loading = false;
      });
      return user;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.loading = false;
      });
      throw error;
    }
  }

  @action
  async fetchRepository(owner: string, repo: string) {
    this.loading = true;
    this.error = null;

    try {
      const repository = await this.fetch(`/repos/${owner}/${repo}`);

      runInAction(() => {
        this.currentRepo = repository;
        this.loading = false;
      });
      return repository;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.loading = false;
      });
      throw error;
    }
  }

  @action
  async fetchUsers(page = 1) {
    this.loading = true;
    this.error = null;

    try {
      // Fetch TechQuery user as demo data
      const techQueryUser = await this.fetch(`/users/TechQuery`);
      const users = [techQueryUser];

      runInAction(() => {
        this.users = users;
        this.loading = false;
      });
      return users;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.loading = false;
      });
      throw error;
    }
  }

  @action
  async fetchRepositories(page = 1) {
    this.loading = true;
    this.error = null;

    try {
      // Fetch EasyWebApp organization repositories as demo data
      const repos = await this.fetch(`/orgs/EasyWebApp/repos?per_page=30&page=${page}`);

      runInAction(() => {
        this.repositories = repos;
        this.loading = false;
      });
      return repos;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.loading = false;
      });
      throw error;
    }
  }

  @action
  async fetchEvents(page = 1) {
    this.loading = true;
    this.error = null;

    try {
      // Fetch TechQuery user's public events as demo data
      const events = await this.fetch(`/users/TechQuery/events/public?per_page=30&page=${page}`);

      runInAction(() => {
        this.events = events;
        this.loading = false;
      });
      return events;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.loading = false;
      });
      throw error;
    }
  }

  @action
  async searchUsers(query: string) {
    this.loading = true;
    this.error = null;

    try {
      const result = await this.fetch(`/search/users?q=${encodeURIComponent(query)}&per_page=30`);

      runInAction(() => {
        this.users = result.items;
        this.loading = false;
      });
      return result.items;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.loading = false;
      });
      throw error;
    }
  }

  @action
  async searchRepositories(query: string) {
    this.loading = true;
    this.error = null;

    try {
      const result = await this.fetch(`/search/repositories?q=${encodeURIComponent(query)}&per_page=30`);

      runInAction(() => {
        this.repositories = result.items;
        this.loading = false;
      });
      return result.items;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.loading = false;
      });
      throw error;
    }
  }
}

export const githubStore = new GitHubStore();