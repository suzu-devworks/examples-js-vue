<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer />

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar color="grey-lighten-4" flat height="72">
      <v-avatar class="ms-2" color="surface-variant" size="32" variant="flat" />

      <v-avatar class="mx-2" color="surface-variant" size="32" variant="flat" />

      <v-btn class="me-2" color="grey" height="40" variant="flat" width="80" />

      <v-btn class="me-2" color="grey" height="40" variant="flat" width="100" />

      <v-btn class="me-2" color="grey" height="40" variant="flat" width="120" />

      <v-btn class="me-2" color="grey" height="40" variant="flat" width="120" />

      <v-spacer />
    </v-app-bar>

    <v-footer app color="grey" height="44" />

    <v-navigation-drawer floating>
      <div class="d-flex px-2 my-2">
        <v-btn class="flex-grow-1" color="grey" height="40" variant="flat" />

        <v-avatar class="ms-2" color="surface-variant" rounded variant="flat" />
      </div>

      <div class="d-flex px-2 my-2 align-center">
        <v-btn class="flex-grow-1 me-2" color="grey-lighten-4" height="40" variant="flat" />

        <v-avatar color="surface-variant" size="18" />

        <v-avatar class="ms-1" color="surface-variant" size="18" />
      </div>

      <div class="px-2 my-2">
        <v-text-field
          class="mb-4"
          density="compact"
          flat
          hide-details
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
        />

        <v-sheet class="mb-2" color="surface-variant" height="24" rounded="pill" width="50%" />

        <v-sheet class="mb-1" color="grey-lighten-1" height="12" rounded="pill" width="40%" />

        <v-sheet class="mb-1" color="grey-lighten-1" height="12" rounded="pill" width="20%" />

        <v-sheet class="mb-1" color="grey-lighten-1" height="12" rounded="pill" width="90%" />

        <v-sheet color="grey-lighten-1" height="12" rounded="pill" width="70%" />

        <v-divider class="my-6" />

        <v-sheet class="mb-2" color="surface-variant" height="24" rounded="pill" width="30%" />

        <v-sheet class="mb-1" color="grey-lighten-1" height="12" rounded="pill" width="65%" />

        <v-sheet class="mb-1" color="grey-lighten-1" height="12" rounded="pill" width="70%" />

        <v-sheet class="mb-1" color="grey-lighten-1" height="12" rounded="pill" width="40%" />

        <v-sheet color="grey-lighten-1" height="12" rounded="pill" width="100%" />

        <v-divider class="my-6" />
      </div>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
