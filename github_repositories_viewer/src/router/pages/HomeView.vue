<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '@/types/user.ts'
import { NoRepositories } from '@/errors/NoRepositories.ts'
import { AxiosError } from 'axios'
import { usernameRules } from '@/rules/usernameRules.ts'
import Paginate from '@/components/Paginate-component.vue'
import DialogComponent from '@/components/Dialog-component.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useUserStore } from '@/stores/UserStore.ts'
import { useGithubStore } from '@/services/GithubService.ts'

const user = ref<User>()
const githubStore = useGithubStore()
const userStore = useUserStore()

const searchText = ref('')
const showSnackBar = ref(false)
const snackBarText = ref('')

const isSearchDisabled = computed(() => {
  return usernameRules.some((rule) => rule(searchText.value) != true)
})


const currentPage = ref(1)
const displayPerPage = 4
const itemCount = ref(0)

const displayedRepositories = computed(() => {
  return (
    user.value?.repositories.slice(
      (currentPage.value - 1) * displayPerPage,
      currentPage.value * displayPerPage,
    ) || []
  )
})
const isLoading = ref(false)

function redirectTo(url: string) {
  window.location.href = url
}

async function fetchUser() {
  isLoading.value = true
  currentPage.value = 1
  try {
    user.value = await githubStore.fetchUser(searchText.value)
    userStore.saveUser(user.value)
    itemCount.value = user.value.repositories.length
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
            @keyup.enter="isSearchDisabled ? void 0 : fetchUser()"
          />
          <v-btn
            :height="58"
            elevation="0"
            class="text-humanit_main"
            @click="fetchUser()"
            :disabled="isSearchDisabled"
          >Search</v-btn
          >
        </v-row>

    <v-col v-if="user">
      <p class="text-h3 text-center">{{ user.username }}</p>
      <v-img
        :src="user.image_url"
        alt="user image"
        @click="redirectTo(user.url)"
        class="cursor-pointer mx-auto pb-10"
        width="25em"
      />
      <v-row class=" align-center">
        <v-col
          v-for="repo in displayedRepositories"
          :key="repo.name"
          cols="12"
          md="6"
          class="d-flex justify-center align-center"
        >
          <DialogComponent
            :name="repo.name"
            :description="repo.description"
            :forks="repo.forks"
            :url="repo.url"
          />
        </v-col>
      </v-row>
      <v-row class="align-center justify-center">
        <Paginate
          v-model="currentPage"
          :max-pages-shown="5"
          :items-per-page="displayPerPage"
          :total-items="itemCount"
        />
      </v-row>
    </v-col>
    <v-col v-else> </v-col>
    <v-snackbar v-model="showSnackBar" :timeout="2500">{{ snackBarText }}</v-snackbar>
  </v-container>
</template>

<style scoped></style>
