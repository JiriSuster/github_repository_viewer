export interface User {
  username: string
  image_url: string
  url: string
  repositories: Repository[]
}

export interface Repository {
  name: string
  description: string
  forks: number
  url: string
}

export interface GithubResponse {
  name: string
  description: string
  html_url: string
  forks: number

  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
}
