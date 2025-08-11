// Mock data for testing when GitHub API is not accessible
export const mockUsers = [
  {
    id: 1,
    login: 'TechQuery',
    name: 'TechQuery',
    avatar_url: 'https://avatars.githubusercontent.com/u/19969570?v=4',
    html_url: 'https://github.com/TechQuery',
    bio: 'Full-Stack Developer, Open Source Contributor',
    company: 'EasyWebApp',
    location: 'China',
    public_repos: 150,
    followers: 500,
    following: 200
  },
  {
    id: 2,
    login: 'octocat',
    name: 'The Octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    html_url: 'https://github.com/octocat',
    bio: 'GitHub mascot',
    company: 'GitHub',
    location: 'San Francisco',
    public_repos: 8,
    followers: 9000,
    following: 9
  },
  {
    id: 3,
    login: 'torvalds',
    name: 'Linus Torvalds',
    avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    html_url: 'https://github.com/torvalds',
    bio: 'Creator of Linux and Git',
    company: null,
    location: 'Portland, OR',
    public_repos: 4,
    followers: 200000,
    following: 0
  }
];

export const mockRepositories = [
  {
    id: 1,
    name: 'WebCell',
    full_name: 'EasyWebApp/WebCell',
    html_url: 'https://github.com/EasyWebApp/WebCell',
    description: 'Web Components engine based on VDOM, JSX, MobX & TypeScript',
    stargazers_count: 180,
    forks_count: 25,
    language: 'TypeScript',
    updated_at: '2024-01-15T10:00:00Z',
    owner: mockUsers[0]
  },
  {
    id: 2,
    name: 'linux',
    full_name: 'torvalds/linux',
    html_url: 'https://github.com/torvalds/linux',
    description: 'Linux kernel source tree',
    stargazers_count: 180000,
    forks_count: 55000,
    language: 'C',
    updated_at: '2024-01-20T15:30:00Z',
    owner: mockUsers[2]
  },
  {
    id: 3,
    name: 'Hello-World',
    full_name: 'octocat/Hello-World',
    html_url: 'https://github.com/octocat/Hello-World',
    description: 'My first repository on GitHub!',
    stargazers_count: 2000,
    forks_count: 1500,
    language: null,
    updated_at: '2024-01-10T08:00:00Z',
    owner: mockUsers[1]
  }
];

export const mockEvents = [
  {
    id: '1',
    type: 'PushEvent',
    actor: mockUsers[0],
    repo: {
      name: 'EasyWebApp/WebCell',
      url: 'https://api.github.com/repos/EasyWebApp/WebCell'
    },
    created_at: '2024-01-20T10:00:00Z',
    payload: {}
  },
  {
    id: '2',
    type: 'CreateEvent',
    actor: mockUsers[1],
    repo: {
      name: 'octocat/Hello-World',
      url: 'https://api.github.com/repos/octocat/Hello-World'
    },
    created_at: '2024-01-20T09:30:00Z',
    payload: {}
  },
  {
    id: '3',
    type: 'IssuesEvent',
    actor: mockUsers[2],
    repo: {
      name: 'torvalds/linux',
      url: 'https://api.github.com/repos/torvalds/linux'
    },
    created_at: '2024-01-20T09:00:00Z',
    payload: {}
  }
];