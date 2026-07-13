<script setup>
import { useAttrs } from 'vue'
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})
const attrs = useAttrs()
</script>

<template>
  <button
    :class="[
      'p-2 cursor-pointer rounded shadow shadow-black',
      props.isActive ? 'bg-amber-300' : 'bg-gray-200',
    ]"
    v-bind="attrs"
    type="button"
  >
    <slot></slot>
  </button>
</template>
