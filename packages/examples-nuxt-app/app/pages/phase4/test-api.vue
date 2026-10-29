<template>
  <article>
    <header>
      <h2>Step 11: Implement login and token management</h2>
    </header>

    <section>
      <p>Please refer to the following commands to test the implemented API.</p>

      <div class="card">
        <h3>Login</h3>
        <pre><code>curl -X POST http://localhost:3000/api/login -d '{"username":"user","password":"pass"}' -H "Content-Type: application/json"</code></pre>
      </div>

      <div class="card">
        <h3>Verify</h3>
        <pre><code>curl -X GET http://localhost:3000/api/verify -H "Authorization: Bearer &lt;YOUR_TOKEN&gt;"</code></pre>
      </div>
    </section>
  </article>
</template>
