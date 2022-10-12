<template>
  <div>
    <h2>
      <p class="title">Vue guide</p>
      <p class="subtitle">
        <a target="_blank" href="https://v3.ja.vuejs.org/guide/">https://v3.ja.vuejs.org/guide/</a>
      </p>
    </h2>

    <section>
      <h3>Features</h3>
      <ul>
        <li><RouterLink to="/vue/components">Components In-Depth</RouterLink></li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
section {
  padding: 1rem 0.2rem;
}

h2 {
  color: #333;
  background-color: rgb(162, 240, 148);
  border-bottom: 2px solid #666;
  padding: 0.2rem;

  a {
    color: rgb(10, 10, 140);
  }
}

.title {
  font-weight: bold;
}

.subtitle {
  font-size: 0.8rem;
  line-height: 1.2rem;
}
</style>
