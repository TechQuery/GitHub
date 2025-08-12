import { HTTPClient } from 'koajax';
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

  private client = new HTTPClient({
    baseURI: 'https://api.github.com',
    responseType: 'json',
  });

  @action
  @toggle('downloading')
  async fetchUser(username: string) {
    const { body } = await this.client.get<GitHubUser>(`/users/${username}`);

    return this.currentUser = body!;
  }

  @action
  @toggle('downloading')
  async fetchRepository(owner: string, repo: string) {
    const { body } = await this.client.get<GitHubRepo>(`/repos/${owner}/${repo}`);

    return this.currentRepo = body!;
  }

  @action
  @toggle('downloading')
  async fetchUsers() {
    // Fetch TechQuery user as demo data
    const { body } = await this.client.get<GitHubUser>(`/users/TechQuery`);

    return this.users = [body!];
  }

  @action
  @toggle('downloading')
  async fetchRepositories(page = 1) {
    // Fetch EasyWebApp organization repositories as demo data
    const { body } = await this.client.get<GitHubRepo[]>(`/orgs/EasyWebApp/repos?per_page=30&page=${page}`);

    return this.repositories = body!;
  }

  @action
  @toggle('downloading')
  async fetchEvents(page = 1) {
    // Fetch TechQuery user's public events as demo data
    const { body } = await this.client.get<GitHubEvent[]>(`/users/TechQuery/events/public?per_page=30&page=${page}`);

    return this.events = body!;
  }

  @action
  @toggle('downloading')
  async searchUsers(query: string) {
    const { body } = await this.client.get<{ items: GitHubUser[] }>(`/search/users?q=${encodeURIComponent(query)}&per_page=30`);
    const { items } = body!;

    return this.users = items;
  }

  @action
  @toggle('downloading')
  async searchRepositories(query: string) {
    const { body } = await this.client.get<{ items: GitHubRepo[] }>(`/search/repositories?q=${encodeURIComponent(query)}&per_page=30`);
    const { items } = body!;

    return this.repositories = items;
  }
}

export const githubStore = new GitHubStore();