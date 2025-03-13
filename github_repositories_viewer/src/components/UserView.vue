<script setup lang="ts">
import DialogComponent from '@/components/Dialog-component.vue'
import Paginate from '@/components/Paginate-component.vue'
import type { User } from '@/types/user.ts'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  user: {
    type: Object as () => User, //https://stackoverflow.com/questions/58241604/how-do-you-type-hint-vue-props-with-typescript-interfaces
  },
  showArrowBack: { type: Boolean, default: false },
})
defineEmits(['return'])

onMounted(() => {
  currentPage.value = 1
  itemCount.value = props.user?.repositories.length || 0
})
const currentPage = ref(1)
const displayPerPage = 4
const itemCount = ref(0)

function redirectTo(url: string) {
  window.location.href = url
}

const displayedRepositories = computed(() => {
  return (
    props.user?.repositories.slice(
      (currentPage.value - 1) * displayPerPage,
      currentPage.value * displayPerPage,
    ) || []
  )
})
</script>

<template>
  <v-container>
    <v-btn v-if="showArrowBack" @click="$emit('return')">
      <p>back</p>
    </v-btn>
    <v-col v-if="user">
      <p class="text-h3 text-center" data-cy="username">{{ user.username }}</p>
      <v-img
        :src="user.image_url"
        alt="user image"
        @click="redirectTo(user.url)"
        class="cursor-pointer mx-auto pb-10"
        width="25em"
      />
      <v-row class="align-center">
        <v-col
          v-for="repo in displayedRepositories"
          :key="repo.name"
          cols="12"
          md="6"
          class="d-flex justify-center align-center"
          data-cy="repo"
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
  </v-container>
</template>

<style scoped></style>
