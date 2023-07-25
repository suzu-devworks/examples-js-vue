<script setup lang="ts">
// https://nuxt.com/docs/getting-started/routing
</script>

<template>
  <header>
    <h1>Nuxt Get Started</h1>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/hello">Hello(Initial Home)</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/assets">Assets</NuxtLink></li>
        <li><NuxtLink to="/styling">Styling</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
        <li><NuxtLink to="/posts/A">Post A</NuxtLink></li>
        <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  font-family: "ui-sans-serif";
}

ul {
  list-style-type: disc;
  margin: 0;
  padding-inline-start: 40px;
}

a {
  text-decoration: underline;
  color: -webkit-link;
}

h1,
h2,
h3 {
  font-size: inherit;
  font-weight: inherit;
}

h1::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  background: url("/img/nuxt-icon-secondary-light.svg") no-repeat;
  background-size: contain;
  margin-right: 0.5rem;
  vertical-align: middle;
}

h1 {
  background-color: $nuxt_green;
  color: $nuxt_white;
  margin: 0;
  padding: 0.5rem;
}
</style>
