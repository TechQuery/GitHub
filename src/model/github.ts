import { components } from '@octokit/openapi-types';
import { action, observable } from 'mobx';
import { type Content, githubClient, type User } from 'mobx-github';
import { BaseModel, toggle } from 'mobx-restful';

export type GitHubEvent = components['schemas']['event'];
export type GitHubGist = components['schemas']['base-gist'];
export type GitHubGistSimple = components['schemas']['gist-simple'];
export type GitHubCommit = components['schemas']['commit'];
export type GitHubMilestone = components['schemas']['milestone'];
export type GitHubBranch = components['schemas']['short-branch'];

export class GitHubStore extends BaseModel {
    @observable accessor users: User[] = [];
    @observable accessor events: GitHubEvent[] = [];
    @observable accessor gists: GitHubGist[] = [];
    @observable accessor currentUser: User | null = null;
    @observable accessor currentGist: GitHubGistSimple | null = null;

    @observable accessor repoContents: Content[] = [];
    @observable accessor repoBranches: GitHubBranch[] = [];
    @observable accessor repoCommits: GitHubCommit[] = [];
    @observable accessor repoMilestones: GitHubMilestone[] = [];
    @observable accessor currentMilestone: GitHubMilestone | null = null;

    @action
    @toggle('downloading')
    async fetchUser(username: string) {
        const { body } = await githubClient.get<User>(`/users/${username}`);

        return (this.currentUser = body!);
    }

    @action
    @toggle('downloading')
    async fetchUsers() {
        // Fetch TechQuery user as demo data
        const { body } = await githubClient.get<User>(`/users/TechQuery`);

        return (this.users = [body!]);
    }

    @action
    @toggle('downloading')
    async fetchEvents(page = 1) {
        // Fetch TechQuery user's public events as demo data
        const { body } = await githubClient.get<GitHubEvent[]>(
            `/users/TechQuery/events/public?per_page=30&page=${page}`
        );

        return (this.events = body!);
    }

    @action
    @toggle('downloading')
    async searchUsers(query: string) {
        const { body } = await githubClient.get<{ items: User[] }>(
            `/search/users?q=${encodeURIComponent(query)}&per_page=30`
        );

        return (this.users = body!.items);
    }

    @action
    @toggle('downloading')
    async fetchGists(page = 1) {
        // Fetch TechQuery user's public gists as demo data
        const { body } = await githubClient.get<GitHubGist[]>(
            `/users/TechQuery/gists?per_page=30&page=${page}`
        );

        return (this.gists = body!);
    }

    @action
    @toggle('downloading')
    async fetchGist(gistId: string) {
        const { body } = await githubClient.get<GitHubGistSimple>(`/gists/${gistId}`);

        return (this.currentGist = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoContents(owner: string, repo: string, path = '', ref = '') {
        const { body } = await githubClient.get<Content[]>(
            `/repos/${owner}/${repo}/contents/${path}${ref ? `?ref=${ref}` : ''}`
        );

        return (this.repoContents = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoBranches(owner: string, repo: string) {
        const { body } = await githubClient.get<GitHubBranch[]>(`/repos/${owner}/${repo}/branches`);

        return (this.repoBranches = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoCommits(owner: string, repo: string, sha = '') {
        const { body } = await githubClient.get<GitHubCommit[]>(
            `/repos/${owner}/${repo}/commits${sha ? `?sha=${sha}` : ''}`
        );

        return (this.repoCommits = body!);
    }

    @action
    @toggle('downloading')
    async fetchRepoMilestones(owner: string, repo: string) {
        const { body } = await githubClient.get<GitHubMilestone[]>(
            `/repos/${owner}/${repo}/milestones?state=all`
        );

        return (this.repoMilestones = body!);
    }

    @action
    @toggle('downloading')
    async fetchMilestone(owner: string, repo: string, milestoneNumber: number) {
        const { body } = await githubClient.get<GitHubMilestone>(
            `/repos/${owner}/${repo}/milestones/${milestoneNumber}`
        );

        return (this.currentMilestone = body!);
    }
}

export const githubStore = new GitHubStore();
