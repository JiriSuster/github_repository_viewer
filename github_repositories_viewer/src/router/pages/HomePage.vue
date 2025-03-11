<script setup lang="ts">
import { useGithubStore } from '@/Services/GithubService.ts'
import { onMounted, ref } from 'vue'
import type { User } from '@/types/user.ts'

const user = ref<User>()
const store = useGithubStore()

onMounted(()=>{
  store.fetchUser("jirisuster").then((userData) => {
    user.value = userData
  })
})


</script>

<template>
<div v-if="user">
  <p>{{user.username}}</p>
  <img :src="user.image_url"  alt="user image"/>
  <p>{{user.url}}</p>

  <p v-for="repo in user.repositories" :key="repo.name">
    {{repo.name}}
  </p>
</div>
  <div v-else>
    <h1>NACITANI</h1>
  </div>
</template>

<style scoped>

</style>
