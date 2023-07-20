<template>
  <q-item
    clickable
    :to="attr.to"
    :tag="attr.tag"
    :target="attr.target"
    :href="attr.href"
  >
    <q-item-section v-if="prop.icon" avatar>
      <q-icon :name="prop.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ prop.title }}</q-item-label>
      <q-item-label caption>{{ prop.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
const prop = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const external = ref(/^http[s]?:\/\//.test(prop.link));

interface EssensialLinkAttribute {
  to?: string;
  tag?: string;
  href?: string;
  target?: string;
}

const attr = reactive<EssensialLinkAttribute>({
  to: external.value ? undefined : prop.link,
  tag: external.value ? 'a' : undefined,
  href: external.value ? prop.link : undefined,
  target: external.value ? '_black' : undefined,
});
</script>
