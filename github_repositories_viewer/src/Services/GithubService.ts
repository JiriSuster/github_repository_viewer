import { defineStore } from 'pinia'
import axios from 'axios'
import type { GithubResponse, User } from '@/types/user.ts'

export const useGithubStore = defineStore('github', () => {
  async function fetchUser(username: string) {
    const url = `https://api.github.com/users/${username}/repos` //hardcoded url, might transfer to .env
    try {
      const response = await axios.get<GithubResponse[]>(url)
      const firstRepo = response.data[0]

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
    } catch (err) {
      console.error(err)
    }
  }
  return { fetchUser }
})
