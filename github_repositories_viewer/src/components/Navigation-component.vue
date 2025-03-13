<script setup lang="ts"></script>

<template>
  <v-card>
    <v-row align="center">
      <v-col cols="auto align-center ml-2">
        <router-link :to="{ name: 'home' }">
          <v-avatar size="40">
            <v-img src="./favicon.png" />
          </v-avatar>
        </router-link>
      </v-col>
      <v-col>
        <v-tabs align-tabs="end" color="humanit_main">
          <v-tab :to="{ name: 'home' }" :value="1">Home</v-tab>
          <v-tab :to="{ name: 'history' }" :value="2">History</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped></style>
