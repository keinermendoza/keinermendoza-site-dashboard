<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <li>
    <RouterLink
      :to="props.to"
      active-class="text-green-700 font-medium bg-green-100"
      class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
    >
      <slot></slot>
    </RouterLink>
  </li>
</template>
