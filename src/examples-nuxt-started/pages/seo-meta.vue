<script setup lang="ts">
// https://nuxt.com/docs/getting-started/seo-meta

const description = ref("My amazing site.")

// Reactive manage head tags.
useHead({
  title: "My App",
  meta: [{ name: "description", content: description }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
})

// The useSeoMeta and useServerSeoMeta composables let you define your site's SEO meta tags.
useSeoMeta({
  title: "My Amazing Site",
  ogTitle: "My Amazing Site",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
})

useSeoMeta({
  description,
})

// Nuxt provides <Title>, <Base>, <NoScript>, <Style>, <Meta>, <Link>, <Body>, <Html> and <Head>
// You can interact directly with your metadata within your component's template.
const title = ref("Hello World")

useHead({
  // provide a dynamic template for customizing the title.
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : "Site Title"
  },
  script: [
    {
      src: "https://third-party-script.com",
      // applicable tags to append them to the end of the <body> tag.
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: "bodyClose",
    },
  ],
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="description" />
      <Style type="text/css" children="body { background-color: green; }" />
    </Head>

    <h1>SEO and Meta</h1>
    <h2>{{ title }}</h2>
    <p>Improve your Nuxt app's SEO with powerful head config, composables and components.</p>
  </div>
</template>
