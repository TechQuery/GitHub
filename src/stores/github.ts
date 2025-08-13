import { components } from '@octokit/openapi-types';
import { HTTPClient } from 'koajax';
import { action, observable } from 'mobx';
import { GitRepository, User } from 'mobx-github';
import { BaseModel, toggle } from 'mobx-restful';

type NotEmpty<T> = T extends null ? never : T extends undefined ? never : T;

export type GitHubEvent = components['schemas']['event'];
export type GitHubGist = components['schemas']['base-gist'];
export type GitHubGistSimple = components['schemas']['gist-simple'];
export type GitHubGistFile = NotEmpty<Required<GitHubGistSimple>['files'][string]>;
export type GitHubCommit = components['schemas']['commit'];
export type GitHubIssue = components['schemas']['issue'];
export type GitHubIssueComment = components['schemas']['issue-comment'];
export type GitHubMilestone = components['schemas']['milestone'];
export type GitHubContents = components['schemas']['content-file'];
export type GitHubBranch = components['schemas']['short-branch'];

export class GitHubStore extends BaseModel {
    @observable accessor users: User[] = [];
    @observable accessor repositories: GitRepository[] = [];
    @observable accessor events: GitHubEvent[] = [];
    @observable accessor gists: GitHubGist[] = [];
    @observable accessor currentUser: User | null = null;
    @observable accessor currentRepo: GitRepository | null = null;
    @observable accessor currentGist: GitHubGistSimple | null = null;

    // New repository detail data
    @observable accessor repoContents: GitHubContents[] = [];
    @observable accessor repoBranches: GitHubBranch[] = [];
    @observable accessor repoCommits: GitHubCommit[] = [];
    @observable accessor repoIssues: GitHubIssue[] = [];
    @observable accessor repoMilestones: GitHubMilestone[] = [];
    @observable accessor currentIssue: GitHubIssue | null = null;
    @observable accessor issueComments: GitHubIssueComment[] = [];
    @observable accessor currentMilestone: GitHubMilestone | null = null;

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

    @action
    @toggle('downloading')
    async fetchGists(page = 1) {
        // Fetch TechQuery user's public gists as demo data
        const { body } = await this.client.get<GitHubGist[]>(
            `/users/TechQuery/gists?per_page=30&page=${page}`
        );

        return (this.gists = body!);
    }

    @action
    @toggle('downloading')
    async fetchGist(gistId: string) {
        const { body } = await this.client.get<GitHubGistSimple>(`/gists/${gistId}`);

        return (this.currentGist = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoContents(owner: string, repo: string, path = '', ref = '') {
        const url = `/repos/${owner}/${repo}/contents/${path}${ref ? `?ref=${ref}` : ''}`;
        const { body } = await this.client.get<GitHubContents[]>(url);

        return (this.repoContents = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoBranches(owner: string, repo: string) {
        const { body } = await this.client.get<GitHubBranch[]>(`/repos/${owner}/${repo}/branches`);

        return (this.repoBranches = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoCommits(owner: string, repo: string, sha = '') {
        const url = `/repos/${owner}/${repo}/commits${sha ? `?sha=${sha}` : ''}`;
        const { body } = await this.client.get<GitHubCommit[]>(url);

        return (this.repoCommits = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoIssues(owner: string, repo: string) {
        const { body } = await this.client.get<GitHubIssue[]>(`/repos/${owner}/${repo}/issues`);

        return (this.repoIssues = body!);
    }

    @action
    @toggle('downloading')
    async fetchIssue(owner: string, repo: string, issueNumber: number) {
        const { body } = await this.client.get<GitHubIssue>(
            `/repos/${owner}/${repo}/issues/${issueNumber}`
        );
        return (this.currentIssue = body!);
    }

    @action
    @toggle('downloading')
    async fetchIssueComments(owner: string, repo: string, issueNumber: number) {
        const { body } = await this.client.get<GitHubIssueComment[]>(
            `/repos/${owner}/${repo}/issues/${issueNumber}/comments`
        );
        return (this.issueComments = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoMilestones(owner: string, repo: string) {
        const { body } = await this.client.get<GitHubMilestone[]>(
            `/repos/${owner}/${repo}/milestones?state=all`
        );
        return (this.repoMilestones = body!);
    }

    @action
    @toggle('downloading')
    async fetchMilestone(owner: string, repo: string, milestoneNumber: number) {
        const { body } = await this.client.get<GitHubMilestone>(
            `/repos/${owner}/${repo}/milestones/${milestoneNumber}`
        );
        return (this.currentMilestone = body!);
    }
}

export const githubStore = new GitHubStore();
