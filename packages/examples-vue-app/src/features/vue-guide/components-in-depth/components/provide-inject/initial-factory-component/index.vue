<script setup lang="ts">
import { inject } from 'vue'

interface IExpensiveClass {
  sayHello(): string
}

class ExpensiveClass implements IExpensiveClass {
  sayHello(): string {
    return 'Hello from ExpensiveClass'
  }
}

const value = inject<IExpensiveClass>('key', () => new ExpensiveClass(), /* treatDefaultAsFactory: */ true)
</script>

<template>
  <div class="tree-component registered-component">
    <p>{{ value.sayHello() }}</p>
  </div>
</template>
