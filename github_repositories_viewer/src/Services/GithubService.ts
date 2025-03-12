import { defineStore } from 'pinia'
import axios from 'axios'
import type { GithubResponse, User } from '@/types/user.ts'
import { NoRepositories } from '@/errors/NoRepositories.ts'

export const useGithubStore = defineStore('github', () => {
  async function fetchUser(username: string) {
    const url = `https://api.github.com/users/${username}/repos` //hardcoded url, might transfer to .env
    const response = await axios.get<GithubResponse[]>(url)
    const firstRepo = response.data[0]

    if (!firstRepo) {
      throw new NoRepositories(`User ${username} exists, but has no public repositories`)
    }

    const user: User = {
      username: firstRepo.owner.login,
      image_url: firstRepo.owner.avatar_url,
      url: firstRepo.owner.html_url,
      repositories: response.data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        forks: repo.forks,
      })),
    }
    return user
  }
  return { fetchUser }
})
