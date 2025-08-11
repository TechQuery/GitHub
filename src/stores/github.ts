import { observable, action } from 'mobx';

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

export class GitHubStore {
  @observable accessor users: GitHubUser[] = [];
  @observable accessor repositories: GitHubRepo[] = [];
  @observable accessor events: GitHubEvent[] = [];
  @observable accessor currentUser: GitHubUser | null = null;
  @observable accessor currentRepo: GitHubRepo | null = null;
  @observable accessor downloading = 0;

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
  private setDownloading(value: number) {
    this.downloading = value;
  }

  @action
  async fetchUser(username: string) {
    this.setDownloading(this.downloading + 1);
    try {
      const user = await this.fetchData(`/users/${username}`);
      this.currentUser = user;
      return user;
    } finally {
      this.setDownloading(this.downloading - 1);
    }
  }

  @action
  async fetchRepository(owner: string, repo: string) {
    this.setDownloading(this.downloading + 1);
    try {
      const repository = await this.fetchData(`/repos/${owner}/${repo}`);
      this.currentRepo = repository;
      return repository;
    } finally {
      this.setDownloading(this.downloading - 1);
    }
  }

  @action
  async fetchUsers() {
    this.setDownloading(this.downloading + 1);
    try {
      // Fetch TechQuery user as demo data
      const techQueryUser = await this.fetchData(`/users/TechQuery`);
      this.users = [techQueryUser];
      return this.users;
    } finally {
      this.setDownloading(this.downloading - 1);
    }
  }

  @action
  async fetchRepositories(page = 1) {
    this.setDownloading(this.downloading + 1);
    try {
      // Fetch EasyWebApp organization repositories as demo data
      const repos = await this.fetchData(`/orgs/EasyWebApp/repos?per_page=30&page=${page}`);
      this.repositories = repos;
      return repos;
    } finally {
      this.setDownloading(this.downloading - 1);
    }
  }

  @action
  async fetchEvents(page = 1) {
    this.setDownloading(this.downloading + 1);
    try {
      // Fetch TechQuery user's public events as demo data
      const events = await this.fetchData(`/users/TechQuery/events/public?per_page=30&page=${page}`);
      this.events = events;
      return events;
    } finally {
      this.setDownloading(this.downloading - 1);
    }
  }

  @action
  async searchUsers(query: string) {
    this.setDownloading(this.downloading + 1);
    try {
      const { items } = await this.fetchData(`/search/users?q=${encodeURIComponent(query)}&per_page=30`);
      this.users = items;
      return items;
    } finally {
      this.setDownloading(this.downloading - 1);
    }
  }

  @action
  async searchRepositories(query: string) {
    this.setDownloading(this.downloading + 1);
    try {
      const { items } = await this.fetchData(`/search/repositories?q=${encodeURIComponent(query)}&per_page=30`);
      this.repositories = items;
      return items;
    } finally {
      this.setDownloading(this.downloading - 1);
    }
  }
}

export const githubStore = new GitHubStore();