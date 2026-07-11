<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  router.back()
}
</script>

<template>
  <button
    class="cursor-pointer hover:text-blue-700 flex gap-2 underline underline-offset-2 text-blue-400"
    @click="goBack"
    aria-label="voltar a página anterior"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
      />
    </svg>
    Voltar
  </button>
</template>
