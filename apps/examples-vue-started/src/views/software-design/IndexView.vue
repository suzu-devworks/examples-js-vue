<template>
  <div>
    <h2>
      <p class="title">ステップアップ式 Vue.js 講座</p>
      <p class="subtitle">Software Design 2020-09.</p>
    </h2>

    <section>
      <h3>Step 1</h3>
      <ul>
        <li>
          <a target="_blank" href="/software-design/202009/step1-hello.html">Hello Vue(html)</a>
        </li>
        <li>
          <a target="_blank" href="/software-design/202009/step1-more-hello.html"
            >More Hello Vue(html)</a
          >
        </li>
      </ul>
    </section>

    <section>
      <h3>Step 2</h3>
      <ul>
        <li><RouterLink to="/software-design/step2-1">Counter</RouterLink></li>
        <li><RouterLink to="/software-design/step2-2/1">Paging</RouterLink></li>
      </ul>
    </section>

    <section>
      <h3>Step 3</h3>
      <ul>
        <li><RouterLink to="/software-design/step3-1">Counter with Store</RouterLink></li>
        <li><RouterLink to="/software-design/step3-2">Fetch Profile with Store</RouterLink></li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
section {
  padding: 1rem 0.2rem;
}

h2 {
  color: #333;
  background-color: #ccc;
  border-bottom: 2px solid #666;
  padding: 0.2rem;
}

.title {
  font-weight: bold;
}

.subtitle {
  font-size: 0.8rem;
  line-height: 1.2rem;
}
</style>
