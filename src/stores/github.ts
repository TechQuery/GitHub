import { components } from '@octokit/openapi-types';
import { HTTPClient } from 'koajax';
import { action, observable } from 'mobx';
import { GitRepository,User } from 'mobx-github';
import { BaseModel, toggle } from 'mobx-restful';

export type GitHubEvent = components['schemas']['event'];

export class GitHubStore extends BaseModel {
    @observable accessor users: User[] = [];
    @observable accessor repositories: GitRepository[] = [];
    @observable accessor events: GitHubEvent[] = [];
    @observable accessor currentUser: User | null = null;
    @observable accessor currentRepo: GitRepository | null = null;

    client = new HTTPClient({
        baseURI: 'https://api.github.com',
        responseType: 'json'
    });

    @action
    @toggle('downloading')
    async fetchUser(username: string) {
        const { body } = await this.client.get<User>(`/users/${username}`);

        return (this.currentUser = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepository(owner: string, repo: string) {
        const { body } = await this.client.get<GitRepository>(`/repos/${owner}/${repo}`);

        return (this.currentRepo = body!);
    }

    @action
    @toggle('downloading')
    async fetchUsers() {
        // Fetch TechQuery user as demo data
        const { body } = await this.client.get<User>(`/users/TechQuery`);

        return (this.users = [body!]);
    }

    @action
    @toggle('downloading')
    async fetchRepositories(page = 1) {
        // Fetch EasyWebApp organization repositories as demo data
        const { body } = await this.client.get<GitRepository[]>(
            `/orgs/EasyWebApp/repos?per_page=30&page=${page}`
        );

        return (this.repositories = body!);
    }

    @action
    @toggle('downloading')
    async fetchEvents(page = 1) {
        // Fetch TechQuery user's public events as demo data
        const { body } = await this.client.get<GitHubEvent[]>(
            `/users/TechQuery/events/public?per_page=30&page=${page}`
        );

        return (this.events = body!);
    }

    @action
    @toggle('downloading')
    async searchUsers(query: string) {
        const { body } = await this.client.get<{ items: User[] }>(
            `/search/users?q=${encodeURIComponent(query)}&per_page=30`
        );
        const { items } = body!;

        return (this.users = items);
    }

    @action
    @toggle('downloading')
    async searchRepositories(query: string) {
        const { body } = await this.client.get<{ items: GitRepository[] }>(
            `/search/repositories?q=${encodeURIComponent(query)}&per_page=30`
        );
        const { items } = body!;

        return (this.repositories = items);
    }
}

export const githubStore = new GitHubStore();
