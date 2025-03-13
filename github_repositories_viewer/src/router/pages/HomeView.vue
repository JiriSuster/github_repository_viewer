<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { User } from '@/types/user.ts'
import { NoRepositories } from '@/errors/NoRepositories.ts'
import { AxiosError } from 'axios'
import { usernameRules } from '@/rules/usernameRules.ts'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useUserStore } from '@/stores/UserStore.ts'
import { useGithubStore } from '@/services/GithubService.ts'
import UserView from '@/components/UserView.vue'

const user = ref<User>()
const githubStore = useGithubStore()
const userStore = useUserStore()

const searchText = ref('')
const showSnackBar = ref(false)
const snackBarText = ref('')

const isSearchDisabled = computed(() => {
  return usernameRules.some((rule) => rule(searchText.value) != true)
})

const isLoading = ref(false)

async function fetchUser() {
  isLoading.value = true
  try {
    user.value = await githubStore.fetchUser(searchText.value)
    userStore.saveUser(user.value)
    isLoading.value = false
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
    isLoading.value = false
  }
}
</script>

<template>
  <v-container max-width="60em">
    <Loading :active="isLoading" />
    <v-row class="align-center d-flex">
      <v-text-field
        class="pt-5"
        v-model="searchText"
        label="username"
        :rules="usernameRules"
        data-cy="search_txt"
        @keyup.enter="isSearchDisabled ? void 0 : fetchUser()"
      />
      <v-btn
        :height="58"
        elevation="0"
        class="text-humanit_main"
        @click="fetchUser()"
        :disabled="isSearchDisabled"
        data-cy="search_btn"
        >Search</v-btn
      >
    </v-row>

    <UserView v-if="user" :user="user" />

    <v-snackbar v-model="showSnackBar" :timeout="2500">{{ snackBarText }}</v-snackbar>
  </v-container>
</template>

<style scoped></style>
