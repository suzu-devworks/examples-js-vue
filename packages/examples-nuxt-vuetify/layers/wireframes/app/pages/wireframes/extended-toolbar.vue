<script setup lang="ts">
definePageMeta({
  layout: 'wireframes-extended-toolbar',
})
</script>

<template>
  <v-container>
    <h1>Extended Toolbar Wireframe</h1>

    <v-row>
      <v-col v-for="n in 24" :key="n" cols="4">
        <v-card height="200" />
      </v-col>
    </v-row>
  </v-container>
</template>
