<template>
  <div>
    <h2>
      <span class="title">ステップアップ式 Vue.js 講座</span><br />
      <span class="subtitle">Software Design 2020-09.</span>
    </h2>

    <div class="step">
      <h3>Step1.</h3>
      <ul>
        <li>
          <a target="_blank" href="/software-design/202009/step1-hello.html">Hello Vue.(html)</a>
        </li>
        <li>
          <a target="_blank" href="/software-design/202009/step1-more-hello.html"
            >More Hello Vue.(html)</a
          >
        </li>
      </ul>
    </div>

    <div class="step">
      <h3>Step2.</h3>
      <ul>
        <li><RouterLink to="/software-design/step2-1">Counter.</RouterLink></li>
        <li><RouterLink to="/software-design/step2-2/1">Paging.</RouterLink></li>
      </ul>
    </div>

    <div class="step">
      <h3>Step3.</h3>
      <ul>
        <li><RouterLink to="/software-design/step3-1">Counter with Store.</RouterLink></li>
        <li><RouterLink to="/software-design/step3-2">Fetch Profile with Store.</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #333;
  background-color: #ccc;
  border-bottom: 2px solid #eee;
}

.title {
  font-weight: bold;
}

.subtitle {
  font-size: 1rem;
}

.step {
  padding-top: 1.2rem;
}
</style>
