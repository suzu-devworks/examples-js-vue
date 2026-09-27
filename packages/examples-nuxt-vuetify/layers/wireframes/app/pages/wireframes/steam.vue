<script setup lang="ts">
definePageMeta({
  layout: 'wireframes-steam',
})
</script>

<template>
  <v-sheet class="mx-auto p-2 pt-6" color="grey-lighten-4">
    <v-sheet color="grey-lighten-2" height="24" rounded="pill" width="88" />

    <v-slide-group show-arrows>
      <v-slide-group-item v-for="n in 5" :key="n">
        <v-sheet class="m-3" color="grey-lighten-1" height="200" rounded width="250" />
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>

  <v-sheet class="mx-auto p-2 pt-6" color="grey-lighten-2">
    <v-sheet color="grey" height="24" rounded="pill" width="88" />

    <v-slide-group show-arrows>
      <v-slide-group-item v-for="n in 15" :key="n">
        <v-sheet class="m-3" color="grey-lighten-1" height="200" rounded :width="n === 1 ? 300 : 150" />
      </v-slide-group-item>
    </v-slide-group>

    <v-container fluid>
      <v-row>
        <v-col v-for="n in 24" :key="n" cols="2">
          <v-sheet color="grey-lighten-1" height="200" rounded />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
