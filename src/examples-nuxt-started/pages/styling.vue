<script setup lang="ts">
// https://nuxt.com/docs/getting-started/styling

// Use a static import for server-side compatibility
import "~/assets/css/first.css"
import "animate.css"

// Caution: Dynamic imports are not server-side compatible
import("~/assets/css/first.css")

// Dynamically Adding Stylesheets
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css?by=usehead",
    },
  ],
})

// ref and reactive
const isActive = ref(true)
const hasError = ref(false)
const classObjectReactive = reactive({
  active: true,
  "text-danger": false,
})

// computed
const error = ref<{ type: string } | null>(null)
const classObjectComputed = computed(() => ({
  active: isActive.value && !error.value,
  "text-danger": error.value && error.value.type === "fatal",
}))

// array
const errorClass = ref("text-danger")

// style
const activeColor = ref("red")
const fontSize = ref(30)
const baseStyles = reactive({ color: "blue", fontSize: "16px" })
const overridingStyles = reactive({ fontSize: "9px" })
const styleObject = reactive({ color: "red", fontSize: "13px" })

// Dynamic Styles With v-bind
const color = ref("red")
</script>

<template>
  <div>
    <h1 class="animate__animated animate__bounce">Styling</h1>
    <p class="code">Nuxt is highly flexible when it comes to styling.</p>

    <section>
      <h2>Ref and reactive</h2>
      <div class="static" :class="{ active: isActive, 'text-danger': hasError }">
        ■modified class
      </div>
      <div :class="classObjectReactive">■modified class</div>
    </section>

    <section>
      <h2>Computed</h2>
      <div :class="classObjectComputed">■modified class</div>
    </section>

    <section>
      <h2>Array</h2>
      <div :class="[{ active: isActive }, errorClass]">■modified classes</div>
    </section>

    <section>
      <h2>Style</h2>
      <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">■modified style</div>
      <div :style="[baseStyles, overridingStyles]">■modified style</div>
      <div :style="styleObject">■modified style</div>
    </section>

    <section>
      <h2>Dynamic Styles With v-bind</h2>
      <div class="text">hello</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import url("~/assets/css/second.css");
@import url("animate.css");

.code {
  font-family: "SourceCodePro", sans-serif;
  background-color: rgb(200, 200, 200);
  display: inline-block;
}

.static {
  font-weight: bold;
}

.active {
  text-shadow: 0 0 2px rgba(255, 191, 0, 0.7);
}

.text-danger {
  color: red;
}

.text {
  color: v-bind(color);
}
</style>
