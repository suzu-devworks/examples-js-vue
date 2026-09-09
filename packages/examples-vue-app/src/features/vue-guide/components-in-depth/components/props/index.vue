<script setup lang="ts">
import { ref } from 'vue'

import BlogPost from './BlogPost.vue'
import BooleanCastingComponent from './BooleanCastingComponent.vue'
import CallbackComponent from './CallbackComponent.vue'
import DestructuringComponent from './DestructuringComponent.vue'
import MyComponent from './MyComponent.vue'
import NullableComponent from './NullableComponent.vue'
import OneWayComponent from './OneWayComponent.vue'
import SimpleComponent from './SimpleComponent.vue'
import TypeValidatableComponent from './TypeValidatableComponent.vue'
import ValidatableComponent from './ValidatableComponent.vue'

const links = ref(15)
const foo = ref('hello')

const post = {
  id: 1,
  title: 'My journey with Vue',
  likes: 42,
  isPublished: false,
  commentIds: [234, 266, 273],
  author: { id: 123, name: 'one two three' },
  requiredValue: 'TRUE',
}

const counter = ref(0)
const onClick = (value: number) => {
  // console.log(`clicked: ${value}`)
  counter.value += value
}

const size = ref('  LARGE  ')

const callbackMessage = ref('')
const onCallback = (value: Date) => {
  // console.log(`callback: ${value.toISOString()}`)
  callbackMessage.value = `callback: ${value.toISOString()}`
}
const asyncCallbackMessage = ref('')
const onCallbackAsync = async (value: Date) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  asyncCallbackMessage.value = `async callback: ${value.toISOString()}`
}
</script>

<template>
  <section class="article-section">
    <h2>Props Declaration</h2>
    <p>You can pass data to components by using props.</p>

    <div class="article-example">
      <SimpleComponent title="This is a simple props component." :likes="links" />
      <button type="button" @click="links++">Increment likes</button>
    </div>
  </section>

  <section class="article-section">
    <h2>Reactive Props Destructure</h2>
    <p>
      From version 3.5 onwards, if there is code within the same <code>script setup</code> block that accesses variables
      destructured from <code>defineProps</code>, it is interpreted as if <code>props</code>. were prefixed to them.
    </p>

    <div class="article-example">
      <input type="text" v-model="foo" name="foo" />
      <DestructuringComponent :foo="foo" />
    </div>
  </section>

  <section class="article-section">
    <h2>Prop Passing Details</h2>
    <p>
      You will experiment with various types of properties—such as static or dynamic ones—as well as property binding.
    </p>

    <div class="article-example">
      <h3>Prop Name Casing</h3>
      <MyComponent greeting-message="hello" />
    </div>

    <div class="article-example">
      <h3>Statically assigned</h3>
      <BlogPost title="My journey with Vue" />
    </div>

    <div class="article-example">
      <h3>Dynamically assigning</h3>
      <BlogPost :title="post.title" />
      <BlogPost :title="post.title + ' by ' + post.author.name" />
    </div>

    <div class="article-example">
      <h3>Set numerical value</h3>
      <BlogPost :likes="42" />
      <BlogPost :likes="post.likes" />
    </div>

    <div class="article-example">
      <h3>Set boolean value</h3>
      <BlogPost is-published />
      <BlogPost :is-published="false" />
      <BlogPost :is-published="post.isPublished" />
    </div>

    <div class="article-example">
      <h3>Set array value</h3>
      <BlogPost :comment-ids="[234, 266, 273]" />
      <BlogPost :comment-ids="post.commentIds" />
    </div>

    <div class="article-example">
      <h3>Set object value</h3>
      <BlogPost
        :author="{
          name: 'Veronica',
          company: 'Veridian Dynamics',
        }"
      />
      <BlogPost :author="post.author" />
    </div>

    <div class="article-example">
      <h3>Set Function callback</h3>
      <CallbackComponent label="Callback me" :callback="onCallback" />
      <p>{{ callbackMessage }}</p>

      <CallbackComponent label="Async callback me" :callback-async="onCallbackAsync" />
      <p>{{ asyncCallbackMessage }}</p>
    </div>

    <div class="article-example">
      <h3>Binding Multiple Properties Using an Object</h3>
      <p>You can use <code>v-bind</code> without an argument:</p>
      <BlogPost v-bind="post" />
    </div>

    <div class="article-example">
      <h3>Merge Behavior When Combining Bindings</h3>
      <p>Regular props — the last value wins:</p>
      <!-- @vue-ignore 'title' is specified more than once,... -->
      <BlogPost title="foo" v-bind="{ title: 'bar' }" />

      <p>All handlers for the same event will be called:</p>
      <BlogPost class="clickable" @click="onClick(1)" v-bind="{ onClick: () => onClick(2) }" />
      <p>Click Count: {{ counter }}</p>
    </div>
  </section>

  <section class="article-section">
    <h2>One-Way Data Flow</h2>
    <p>Data flows down from parent to child, but the reverse does not occur.</p>

    <div class="article-example">
      <h3>Props is read-only</h3>
      <OneWayComponent :foo="foo" />
    </div>

    <div class="article-example">
      <h3>The prop is used to pass in an initial value</h3>
      <OneWayComponent :initial-counter="10" />
    </div>

    <div class="article-example">
      <h3>The prop is passed in as a raw value that needs to be transformed</h3>
      <input v-model="size" name="size" />
      <OneWayComponent :size="size" />
    </div>

    <div class="article-example">
      <h3>Mutating Object / Array Props</h3>
      <p>
        Nested properties of objects and arrays are passed by reference and can be modified, but it is best to avoid
        doing so.
      </p>
      <OneWayComponent :list="['AAA', 'BB', 'C']" />
    </div>
  </section>

  <section class="article-section">
    <h2>Props Validation</h2>
    <p>
      When you specify an object containing validation requirements in <code>defineProps</code>, the properties are
      validated. However, custom validators cannot be used when using TypeScript type annotations.
    </p>

    <div class="article-example">
      <ValidatableComponent
        :prop-a="123"
        :prop-b="'hello'"
        :prop-c="'required string'"
        :prop-d="null"
        :prop-e="456"
        :prop-f="{ message: 'hello world' }"
        :prop-g="'success'"
        :prop-h="() => console.log('Hello from propH')"
      />

      <TypeValidatableComponent
        :prop-a="123"
        :prop-b="'hello'"
        :prop-c="'required string'"
        :prop-d="null"
        :prop-e="456"
        :prop-f="{ message: 'hello world' }"
        :prop-g="'success'"
        :prop-h="() => console.log('Hello from propH')"
      />
    </div>
  </section>

  <section class="article-section">
    <h2>Nullable Props</h2>
    <p>If the type is required but nullable, you can use the array syntax that includes null.</p>

    <div class="article-example">
      <NullableComponent :id="null" />
      <NullableComponent :id="'not null'" />
    </div>
  </section>

  <section class="article-section">
    <h2>Boolean Casting</h2>
    <p>Boolean props have special type conversion rules.</p>

    <div class="article-example">
      <BooleanCastingComponent disabled disabled-a disabled-b disabled-c disabled-d />
      <BooleanCastingComponent />
    </div>
  </section>
</template>
