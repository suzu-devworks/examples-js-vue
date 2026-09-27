<script setup lang="ts">
definePageMeta({
  layout: 'wireframes-constrained',
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg">
          <v-list rounded="lg">
            <v-list-item v-for="n in 5" :key="n" link :title="`List Item ${n}`" />

            <v-divider class="my-2" />

            <v-list-item color="grey-lighten-4" link title="Refresh" />
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="p-4" min-height="70vh" rounded="lg">
          <h1>Constrained Wireframe</h1>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
