<script setup lang="ts">
import { useGithubStore } from '@/Services/GithubService.ts'
import { ref } from 'vue'
import type { User } from '@/types/user.ts'

const user = ref<User>()
const store = useGithubStore()
const searchText = ref('')

store.fetchUser('jirisuster').then((userData) => {
  user.value = userData
})

function fetchUser() {
  store.fetchUser(searchText.value).then((userData) => {
    user.value = userData
  })
}

const usernameRules = [
  (v: string) => !!v || 'username is required',
  (v: string) => (v.length >= 1 && v.length <= 39) || 'username must be between 1-39 characters',
  (v: string) =>
    (v.charAt(0) != '-' && v.charAt(v.length - 1) != '-') ||
    "username must not start or end with '-'",
  (v: string) => !v.includes('--') || "username must not include multiple '-' in a row",
]
</script>

<template>
  <v-col>
    <v-row>
      <v-text-field v-model="searchText" label="username" :rules="usernameRules" />
      <v-btn @click="fetchUser()">Search</v-btn>
    </v-row>

    <div v-if="user">
      <p>{{ user.username }}</p>
      <img :src="user.image_url" alt="user image" />
      <p>{{ user.url }}</p>
      <v-dialog v-for="repo in user.repositories" :key="repo.name"> <!-- https://vuetifyjs.com/en/components/dialogs -->
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            :text="repo.name"
            variant="flat"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card :title="repo.name">
            <v-card-text>
              <v-col>
                <p>{{ repo.description ? repo.description : 'No description :(' }}</p>
                <p>{{ repo.forks }} forks</p>
                <a :href="repo.url">link</a>
              </v-col>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="Close" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </v-col>
</template>

<style scoped></style>
