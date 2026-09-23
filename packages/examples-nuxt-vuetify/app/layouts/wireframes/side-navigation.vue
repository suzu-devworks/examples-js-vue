<template>
  <v-app id="inspire">
    <v-navigation-drawer class="pt-4 profile-sheet" model-value rail>
      <v-avatar
        v-for="n in 6"
        :key="n"
        class="block text-center mx-auto mb-9"
        :class="`profile-avatar-${n === 1 ? 'darken' : 'lighten'}`"
        :size="n === 1 ? 36 : 20"
      />
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped lang="css">
.v-theme--light {
  .profile-sheet {
    background-color: var(--color-neutral-100);
  }

  .profile-avatar-darken {
    background-color: var(--color-neutral-500);
  }

  .profile-avatar-lighten {
    background-color: var(--color-neutral-300);
  }
}

.v-theme--dark {
  .profile-sheet {
    background-color: var(--color-neutral-800);
  }

  .profile-avatar-darken {
    background-color: var(--color-neutral-500);
  }

  .profile-avatar-lighten {
    background-color: var(--color-neutral-300);
  }
}
</style>
