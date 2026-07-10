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
    class="p-2 cursor-pointer rounded shadow bg-amber-100"
    :class="{ 'bg-amber-300': props.isActive }"
    v-bind="attrs"
    type="button"
  >
    <slot></slot>
  </button>
</template>
