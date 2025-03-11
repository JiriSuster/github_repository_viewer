<script setup lang="ts">
import { useGithubStore } from '@/Services/GithubService.ts'
import { onMounted, ref } from 'vue'

const test = ref("wait for the data to load...")
const store = useGithubStore()

onMounted(()=>{
  store.fetchUser("jirisuster").then((user) => {
    test.value = user
  })
})


</script>

<template>
<p>{{test}}</p>
</template>

<style scoped>

</style>
