import { observable, action, runInAction } from 'mobx';
import { mockUsers, mockRepositories, mockEvents } from './mockData';

// GitHub API base configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = '39ff883676bf43c5723e92701487a020ad1abfb2'; // From original code

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

  @observable
  useMockData = false;

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
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
      let user;
      if (this.useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        user = mockUsers.find(u => u.login.toLowerCase() === username.toLowerCase()) || mockUsers[0];
      } else {
        try {
          user = await this.fetch(`/users/${username}`);
        } catch (error) {
          // Fallback to mock data if API fails
          this.useMockData = true;
          user = mockUsers.find(u => u.login.toLowerCase() === username.toLowerCase()) || mockUsers[0];
        }
      }
      
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
      let repository;
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        repository = mockRepositories.find(r => 
          r.owner.login.toLowerCase() === owner.toLowerCase() && 
          r.name.toLowerCase() === repo.toLowerCase()
        ) || mockRepositories[0];
      } else {
        try {
          repository = await this.fetch(`/repos/${owner}/${repo}`);
        } catch (error) {
          this.useMockData = true;
          repository = mockRepositories.find(r => 
            r.owner.login.toLowerCase() === owner.toLowerCase() && 
            r.name.toLowerCase() === repo.toLowerCase()
          ) || mockRepositories[0];
        }
      }

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
      let users;
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        users = mockUsers;
      } else {
        try {
          users = await this.fetch(`/users?per_page=30&page=${page}`);
        } catch (error) {
          this.useMockData = true;
          users = mockUsers;
        }
      }

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
      let repos;
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        repos = mockRepositories;
      } else {
        try {
          repos = await this.fetch(`/repositories?per_page=30&page=${page}`);
        } catch (error) {
          this.useMockData = true;
          repos = mockRepositories;
        }
      }

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
      let events;
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        events = mockEvents;
      } else {
        try {
          events = await this.fetch(`/events?per_page=30&page=${page}`);
        } catch (error) {
          this.useMockData = true;
          events = mockEvents;
        }
      }

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
    // For demo, just filter mock users
    this.loading = true;
    this.error = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const filteredUsers = mockUsers.filter(user => 
        user.login.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase())
      );

      runInAction(() => {
        this.users = filteredUsers;
        this.loading = false;
      });
      return filteredUsers;
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
    // For demo, just filter mock repositories
    this.loading = true;
    this.error = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const filteredRepos = mockRepositories.filter(repo => 
        repo.name.toLowerCase().includes(query.toLowerCase()) ||
        repo.full_name.toLowerCase().includes(query.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(query.toLowerCase()))
      );

      runInAction(() => {
        this.repositories = filteredRepos;
        this.loading = false;
      });
      return filteredRepos;
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