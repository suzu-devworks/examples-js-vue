<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-toggle
          v-model="darkMode"
          icon="dark_mode"
          color="pink-4"
          @click="toggleDarkMode"
        />

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="transition-container">
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutLeft"
          @enter="onBeforeEnter"
          @after-enter="onAfterEnter"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useQuasar } from 'quasar';

// --- export *.ts
import { essentialLinks } from 'components/essential-links';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// --- dark mode
const $quasar = useQuasar();
const darkMode = ref($quasar.dark.isActive);
function toggleDarkMode() {
  $quasar.dark.set(darkMode.value);
}

// --- transition hide scrollbar.
function onBeforeEnter(elem: Element /* done: () => void */): void {
  console.log('onEnter', elem.parentElement);
  if (elem.parentElement) {
    elem.parentElement.style.overflow = 'hidden';
  }
  // done();
}

function onAfterEnter(elem: Element): void {
  //console.log('onBeforeEnter');
  if (elem.parentElement) {
    elem.parentElement.style.overflow = '';
  }
}
</script>
