<script setup lang="ts">
import { useGithubStore } from '@/Services/GithubService.ts'
import { ref } from 'vue'
import type { User } from '@/types/user.ts'

const user = ref<User>()
const store = useGithubStore()
const searchText = ref('')

function fetchUser() {
  store.fetchUser(searchText.value).then((userData) => {
    user.value = userData
  })
}
</script>

<template>
  <v-col>
    <v-row>
      <v-text-field v-model="searchText" label="username" />
      <v-btn @click="fetchUser()">Search</v-btn>
    </v-row>

    <div v-if="user">
      <p>{{ user.username }}</p>
      <img :src="user.image_url" alt="user image" />
      <p>{{ user.url }}</p>

      <p v-for="repo in user.repositories" :key="repo.name">
        {{ repo.name }}
      </p>
    </div>
  </v-col>
</template>

<style scoped></style>
