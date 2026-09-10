import type { RouteLocationNormalizedGeneric } from 'vue-router'

function removeQueryParams(to: RouteLocationNormalizedGeneric) {
  if (Object.keys(to.query).length) {
    return { path: to.path, query: {}, hash: to.hash }
  }
}

function removeHash(to: RouteLocationNormalizedGeneric) {
  if (to.hash) {
    return { path: to.path, query: to.query, hash: '' }
  }
}

export { removeQueryParams, removeHash }
