<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationComponent from '@/components/Navigation-component.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavigationComponent />
    </div>
  </header>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style scoped></style>
