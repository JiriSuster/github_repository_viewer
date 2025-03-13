<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" data-cy="home_route">Home</RouterLink>
        <RouterLink to="/history" data-cy="history_route">History</RouterLink>
      </nav>
    </div>
  </header>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style scoped></style>
