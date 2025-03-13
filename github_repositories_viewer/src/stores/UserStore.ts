import { defineStore } from 'pinia'
import type { Repository, User } from '@/types/user.ts'
import { useGithubStore } from '@/services/GithubService.ts'
import { computed } from 'vue'

export const useUserStore = defineStore('users', () => {
  const githubStore = useGithubStore()

  function saveUser(user: User) {
    localStorage.setItem(`user_${user.username}`, JSON.stringify(user)) //move prefix to env/config?
  }

  function removeUser(user: User) {
    localStorage.removeItem(`user_${user.username}`)
  }

  function getAllUsers() {
    const userKeys = Object.keys(localStorage).filter((key) => key.startsWith('user_'))

    return userKeys.map((key) => {
      const userData = localStorage.getItem(key)
      return JSON.parse(<string>userData) as User
    })
  }

  async function refetchAllUsers() {
    const oldUsers: User[] = getAllUsers()
    try {
      return await Promise.all(
        oldUsers.map(async (user) => {
          const freshUser = await githubStore.fetchUser(user.username)
          saveUser(freshUser)
          return freshUser
        }),
      )
    } catch (err) {
      console.error('Failed to refetch users:', err)
      return oldUsers
    }
  }

  function getRepositoriesForPage(user: User, currentPage: number, displayPerPage: number) {
    return (
      user?.repositories.slice((currentPage - 1) * displayPerPage, currentPage * displayPerPage) ||
      []
    )
  }

  return { saveUser, removeUser, getAllUsers, refetchAllUsers, getRepositoriesForPage }
})
