import { defineComponent, h } from 'vue'

export default defineComponent({
  props: { title: String, modelValue: String },
  render() {
    return h('div', { class: ['render-input-text', 'registered-component'] }, [
      h('input', {
        type: 'text',
        name: this.title,
        value: this.modelValue,
      }),
      ' : ',
      h('span', {}, `${this.title}`),
    ])
  },
})
