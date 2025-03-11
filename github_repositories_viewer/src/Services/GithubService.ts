import { defineStore } from 'pinia'
import axios from 'axios'

export const useGithubStore = defineStore('github', () => {
  async function fetchUser(username: string){
    const url = `https://api.github.com/users/${username}/repos`; //hardcoded url, might transfer to .env
    try{
      const response = await axios.get(url);
      return response.data;
    }
    catch(err){
      console.error(err);
    }
  }
  return {fetchUser}
})


