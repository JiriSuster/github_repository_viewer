<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { User } from '@/types/user.ts'
import { useUserStore } from '@/stores/UserStore.ts'
import isOnline from 'is-online';
import Paginate from '@/components/Paginate-component.vue'



const users = ref<User[]>([])
const userStore = useUserStore()

const currentPage = ref(1)
const displayPerPage = 8
const itemCount = ref(0)

const displayedUsers = computed(() => {
  return (
    users.value?.slice(
      (currentPage.value - 1) * displayPerPage,
      currentPage.value * displayPerPage,
    ) || []
  )
})


onMounted( ()=>{
  users.value = userStore.getAllUsers()
  itemCount.value = users.value.length
})

function redirectTo(url: string) {
  window.location.href = url
}


</script>

<template>
  <v-container max-width="60em">
    <v-row>
      <v-col class="pa-4" cols="3" v-for="user in displayedUsers" :key="user.username">
        <p class="text-center text-h5">{{user.username}}</p>
        <v-img
          v-if="isOnline"
          :src="user.image_url"
          alt="user image"
          @click="redirectTo(user.url)"
          class="cursor-pointer mx-auto"
          width="100%"
        >
          <template v-slot:error>
            <v-img src="./placeholder.png"/>
          </template>
        </v-img>
        <v-img
          v-else
          src="./placeholder.png"
        />
      </v-col>
    </v-row>
    <v-spacer/>
    <v-row class="justify-center">
    <Paginate
      class="pt-4"
      v-model="currentPage"
      :max-pages-shown="5"
      :items-per-page="displayPerPage"
      :total-items="itemCount"
    />
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
