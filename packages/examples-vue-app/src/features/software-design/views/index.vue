<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import SidebarArticleLayout from '@/components/layouts/SidebarArticleLayout.vue'
</script>

<template>
  <DefaultLayout>
    <SidebarArticleLayout>
      <template #sidebar>
        <header class="article-sidebar-introduction">
          <div class="article-sidebar-introduction__title">Articles of Software Design</div>
          <p class="article-sidebar-introduction__description">
            This content is based on the feature article from the Software Design.
          </p>
        </header>

        <div class="article-sidebar-menu">
          <nav>
            <section class="article-menu-section">
              <header>
                <div class="article-menu-section__title">
                  [Step-by-Step] Vue.js Course Understand the Trends in JavaScript Frameworks - 2020-09
                </div>
              </header>
              <ul>
                <li>
                  <RouterLink to="/software-design/2020-09/step1">Step 1: Experience reactive data binding</RouterLink>
                </li>
                <li>
                  <RouterLink to="/software-design/2020-09/step2"
                    >Step 2: Learn the basics of componentization and page navigation to build an SPA</RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="/software-design/2020-09/step3"
                    >Step 3: Address issues arising from component splitting
                  </RouterLink>
                </li>
              </ul>
            </section>
          </nav>
        </div>
      </template>

      <RouterView />
    </SidebarArticleLayout>
  </DefaultLayout>
</template>
