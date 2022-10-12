<script lang="ts">
import { defineComponent, h } from "vue"
import ModuleComponent from "@/components/vue-guide/ModuleComponent.vue"
import PropsComponent from "@/components/vue-guide/PropsComponent.vue"

//Local Registration
const LocalComponent = defineComponent({
  props: { title: String },
  render() {
    return h("div", { class: "local-component" }, [
      h("input", {
        type: "text",
        value: this.title,
      }),
      ": ",
      h("span", {}, `echo: ${this.title}`),
    ])
  },
})

export default {
  components: {
    "component-a": LocalComponent,
    "component-b": ModuleComponent,
    "props-component": PropsComponent,
  },
}
</script>

<script setup lang="ts">
import { reactive } from "vue"

const post = reactive({
  title: "My journey with Vue",
  likes: 42,
  isPublished: false,
  commentIds: [234, 266, 273],
  author: { id: 123, name: "one two three" },
  requiredValue: "TRUE",
})

const rangeProps = reactive({
  type: "range",
  max: 1,
  min: 0,
})

function DoPromise(): Promise<number> {
  return new Promise((resolve) => {
    resolve(123)
  })
}
</script>

<template>
  <div>
    <h2>Components In-Depth</h2>
    <section>
      <h3>Registration</h3>
      <global-component title="this is global-component." />
      <component-a title="this is local-component." />
      <component-b title="this is module-component." />
    </section>

    <section>
      <h3>Props</h3>
      <props-component
        title="My journey with Vue"
        :likes="42"
        :is-published="false"
        :comment-ids="[234, 266, 273]"
        :author="{ name: 'Veronica', company: 'Veridian Dynamics' }"
        :callback="() => {}"
        :contacts-promise="DoPromise()"
        :required-value="true"
        varidation-string="invalid-value."
      />
      <props-component v-bind="post" />
      <input v-bind="rangeProps" />
    </section>

    <section>
      <h3>Class, Style</h3>
    </section>

    <section>
      <h3>Events</h3>
    </section>

    <section>
      <h3>Slots</h3>
    </section>

    <section>
      <h3>Provide / Inject</h3>
    </section>
  </div>
</template>

<style scoped lang="scss">
section {
  padding: 0.5rem 0.2rem;

  h3 {
    font-weight: bold;
  }
}
</style>
