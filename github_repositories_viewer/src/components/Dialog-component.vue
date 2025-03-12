<script setup lang="ts">
defineProps({
  name: String,
  description: String,
  forks: Number,
  url: String,
})
</script>

<template>
  <v-dialog>
    <!-- https://vuetifyjs.com/en/components/dialogs -->
    <template v-slot:activator="{ props: activatorProps }">
      <!--      <v-btn-->
      <!--        v-bind="activatorProps"-->
      <!--        color="surface-variant"-->
      <!--        :text="name"-->
      <!--        variant="flat"-->
      <!--      ></v-btn>-->
      <v-col>
        <v-card
          max-width="25em"
          max-height="13em"
          min-height="13em"
          min-width="25em"
          v-bind="activatorProps"
          :title="name"
          :text="description ? description : 'No description :('"
        />
      </v-col>
    </template>

    <template v-slot:default="{ isActive }">
      <v-row class="justify-center">
        <v-card max-width="40em" :title="name">
          <v-card-text>
            <v-col>
              <p>{{ description ? description : 'No description :(' }}</p>
              <p>{{ forks }} forks</p>
              <a :href="url">Bring me to the repo!</a>
            </v-col>
          </v-card-text>

          <v-card-actions>
            <v-btn text="Close" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </template>
  </v-dialog>
</template>

<style scoped></style>
