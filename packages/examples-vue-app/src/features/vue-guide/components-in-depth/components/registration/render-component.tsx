import { defineComponent, h } from 'vue'

export default defineComponent({
  props: { message: String },
  setup(props) {
    return () => h('p', { class: ['render-component', 'registered-component'] }, props.message)
  },
})
