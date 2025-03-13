<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import type { User } from '@/types/user.ts'
import { useUserStore } from '@/stores/UserStore.ts'
import isOnline from 'is-online'
import Paginate from '@/components/Paginate-component.vue'
import UserView from '@/components/UserView.vue'

const users = ref<User[]>([])
const selectedUser = ref<User>()
const userStore = useUserStore()

const currentPage = ref(1)
const displayPerPage = screen.width >= 768 ? 8 : 4
const itemCount = ref(0)

const displayedUsers = computed(() => {
  return (
    users.value?.slice(
      (currentPage.value - 1) * displayPerPage,
      currentPage.value * displayPerPage,
    ) || []
  )
})

onMounted(async () => {
  users.value = userStore.getAllUsers()
  itemCount.value = users.value.length
  currentPage.value = 1
  users.value = await userStore.refetchAllUsers()
})
const showPlaceholder = ref(false)

watchEffect(async () => {
  showPlaceholder.value = !(await isOnline())
})

function selectUser(user: User) {
  selectedUser.value = user
}

function hideUserView() {
  selectedUser.value = undefined
}

function removeUser(user: User) {
  userStore.removeUser(user)
  users.value = userStore.getAllUsers()
  hideUserView()
}
</script>

<template>
  <v-container max-width="60em">
    <v-col v-if="selectedUser">
      <UserView
        :user="selectedUser"
        :show-arrow-back="true"
        @return="hideUserView()"
        @delete_user="removeUser(selectedUser)"
      />
    </v-col>
    <v-col v-else>
      <v-row>
        <v-col class="pa-4" cols="6" v-for="user in displayedUsers" :key="user.username" md="3">
          <p class="text-center text-h5">{{ user.username }}</p>
          <!-- It looks like the images are being cached, so no need for this functionality -->
          <v-img
            v-if="true"
            :src="user.image_url"
            alt="user image"
            @click="selectUser(user)"
            class="cursor-pointer mx-auto"
            min-width="5em"
            width="100%"
            data-cy="image"
          >
            <template #error>
              <v-img src="./placeholder.png" class="cursor-pointer" @click="selectUser(user)" />
            </template>
          </v-img>
          <v-img v-else src="./placeholder.png" class="cursor-pointer" @click="selectUser(user)" />
        </v-col>
      </v-row>
      <v-spacer />
      <v-row class="justify-center">
        <Paginate
          v-if="users.length > 0"
          class="pt-4"
          v-model="currentPage"
          :max-pages-shown="5"
          :items-per-page="displayPerPage"
          :total-items="itemCount"
        />
        <p v-else class="text-h3">No history yet</p>
      </v-row>
    </v-col>
  </v-container>
</template>

<style scoped></style>
