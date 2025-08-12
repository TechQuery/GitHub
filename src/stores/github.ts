import { action, observable } from 'mobx';
import { BaseModel, toggle } from 'mobx-restful';
import { HTTPClient } from 'koajax';

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

  private get defaultHeaders() {
    return {
      'Accept': 'application/vnd.github.v3+json',
    };
  }

  @action
  @toggle('downloading')
  async fetchUser(username: string) {
    const { body: user } = await this.client.get(`/users/${username}`, this.defaultHeaders);
    this.currentUser = user as GitHubUser;
    return user;
  }

  @action
  @toggle('downloading')
  async fetchRepository(owner: string, repo: string) {
    const { body: repository } = await this.client.get(`/repos/${owner}/${repo}`, this.defaultHeaders);
    this.currentRepo = repository as GitHubRepo;
    return repository;
  }

  @action
  @toggle('downloading')
  async fetchUsers() {
    // Fetch TechQuery user as demo data
    const { body: techQueryUser } = await this.client.get(`/users/TechQuery`, this.defaultHeaders);
    this.users = [techQueryUser as GitHubUser];
    return this.users;
  }

  @action
  @toggle('downloading')
  async fetchRepositories(page = 1) {
    // Fetch EasyWebApp organization repositories as demo data
    const { body: repos } = await this.client.get(`/orgs/EasyWebApp/repos?per_page=30&page=${page}`, this.defaultHeaders);
    this.repositories = repos as GitHubRepo[];
    return repos;
  }

  @action
  @toggle('downloading')
  async fetchEvents(page = 1) {
    // Fetch TechQuery user's public events as demo data
    const { body: events } = await this.client.get(`/users/TechQuery/events/public?per_page=30&page=${page}`, this.defaultHeaders);
    this.events = events as GitHubEvent[];
    return events;
  }

  @action
  @toggle('downloading')
  async searchUsers(query: string) {
    const { body } = await this.client.get(`/search/users?q=${encodeURIComponent(query)}&per_page=30`, this.defaultHeaders);
    const { items } = body as { items: GitHubUser[] };
    this.users = items;
    return items;
  }

  @action
  @toggle('downloading')
  async searchRepositories(query: string) {
    const { body } = await this.client.get(`/search/repositories?q=${encodeURIComponent(query)}&per_page=30`, this.defaultHeaders);
    const { items } = body as { items: GitHubRepo[] };
    this.repositories = items;
    return items;
  }
}

export const githubStore = new GitHubStore();