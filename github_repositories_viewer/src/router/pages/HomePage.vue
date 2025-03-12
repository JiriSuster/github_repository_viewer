<script setup lang="ts">
import { useGithubStore } from '@/Services/GithubService.ts'
import { computed, ref } from 'vue'
import type { User } from '@/types/user.ts'
import { NoRepositories } from '@/errors/NoRepositories.ts'
import { AxiosError } from 'axios'
import { usernameRules } from '@/rules/usernameRules.ts'

const user = ref<User>()
const store = useGithubStore()
const searchText = ref('')

const showSnackBar = ref(false)
const snackBarText = ref('')

const isSearchDisabled = computed(() => {
  return usernameRules.some((rule) => rule(searchText.value) != true)
})

store.fetchUser('jirisuster').then((userData) => {
  user.value = userData
})

async function fetchUser() {
  try {
    user.value = await store.fetchUser(searchText.value)
  } catch (err) {
    if (err instanceof NoRepositories) {
      snackBarText.value = err.message
      showSnackBar.value = true
      console.error(err.message)
    } else if (err instanceof AxiosError) {
      if (err.status == 404) {
        snackBarText.value = `user ${searchText.value} does not exist.`
        showSnackBar.value = true
      }
    } else {
      console.error(err)
    }
  }
}
</script>

<template>
  <v-container>
    <v-col>
      <v-row>
        <v-text-field v-model="searchText" label="username" :rules="usernameRules" />
        <v-btn @click="fetchUser()" :disabled="isSearchDisabled">Search</v-btn>
      </v-row>

      <div v-if="user">
        <p>{{ user.username }}</p>
        <img :src="user.image_url" alt="user image" />
        <p>{{ user.url }}</p>
        <v-dialog v-for="repo in user.repositories" :key="repo.name">
          <!-- https://vuetifyjs.com/en/components/dialogs -->
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
      <v-snackbar v-model="showSnackBar" :timeout="2500">{{ snackBarText }}</v-snackbar>
    </v-col>
  </v-container>
</template>

<style scoped></style>
