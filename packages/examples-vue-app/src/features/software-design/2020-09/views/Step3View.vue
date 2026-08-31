<template>
  <main class="article-page">
    <header>
      <h1>Step 3: Address issues arising from component splitting</h1>
      <p>[Step-by-Step] Vue.js Course Understand the Trends in JavaScript Frameworks</p>
    </header>

    <section class="article-section">
      <h2>The applications using Options API and componentization</h2>

      <nav>
        <ul>
          <li>
            <RouterLink to="/software-design/2020-09/step3/counter"
              >Step 3-1: Example of the counter component with store</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/software-design/2020-09/step3/profile"
              >Step 3-2: Example of Fetch component with store</RouterLink
            >
          </li>
        </ul>
      </nav>

      <RouterView />
    </section>
  </main>
</template>
