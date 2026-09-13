<script setup lang="ts">
import { computed, ref } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'

import data from '../data/spots.json'

const route = useRoute()
const currentId = computed(() => Number(route.params['id']))
const isModified = ref(false)

// same as beforeRouteUpdate option but with no access to `this`
onBeforeRouteUpdate((to, _from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  const exists = data.spots.some((spot) => spot.id === Number(to.params['id']))
  if (!exists) {
    // handle the case when the spot does not exist
    return false
  }
})

// same as beforeRouteLeave option but with no access to `this`
onBeforeRouteLeave((_to, _from) => {
  if (isModified.value) {
    return true
  }

  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  // cancel the navigation and stay on the same page
  if (!answer) return false
})

function getRoute(id: number) {
  return { name: 'router.navigation-guards.in-components', params: { id } }
}

const currentSpot = computed(() => data.spots.find((spot) => spot.id === currentId.value))
</script>

<template>
  <main class="spot-detail-view article-page">
    <header>
      <h1>In-Component Guards example</h1>
      <p>Advanced / Navigation Guards</p>
    </header>

    <section class="article-section">
      <h2>Spots for Hokkaido</h2>

      <div class="article-example">
        <div v-if="currentSpot" class="spot-detail">
          <h3>{{ currentSpot.name }}</h3>

          <ul>
            <li>Area: {{ currentSpot.area }}</li>
            <li>Category: {{ currentSpot.category }}</li>
            <li>Address: {{ currentSpot.address }}</li>
            <li>Location: {{ currentSpot.location }}</li>
            <li>
              Features:
              <ul>
                <li v-for="feature in currentSpot.features" :key="feature">{{ feature }}</li>
              </ul>
            </li>
            <li>Rating: {{ currentSpot.rating }}</li>
            <li>Best season: {{ currentSpot.best_season }}</li>
          </ul>
        </div>
      </div>

      <footer>
        <div class="pagination">
          <RouterLink :to="getRoute(currentId - 1)" class="button button-primary">Prev</RouterLink>
          <div class="pagination-info">
            <span>{{ currentId }}</span> / <span> {{ data.spots.length }} </span>
          </div>
          <RouterLink :to="getRoute(currentId + 1)" class="button button-primary">Next</RouterLink>
        </div>
        <label>
          <input v-model="isModified" name="isModified" type="checkbox" />
          Unsaved Changes
        </label>
      </footer>
    </section>
  </main>
</template>

<style lang="css" scoped>
.spot-detail-view {
  h3 {
    margin-bottom: var(--app-spacing-md);
    font-size: var(--app-spacing-xl);
    font-weight: var(--app-weight-bold);
    color: var(--app-color-primary);
  }

  footer {
    display: flex;
    gap: var(--app-spacing-md);
    align-items: center;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .pagination-info {
      flex: 1;
      width: 6em;
      padding: 0 var(--app-spacing-md);
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
