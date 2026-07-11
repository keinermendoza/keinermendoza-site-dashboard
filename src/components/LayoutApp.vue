<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <!-- Botón móvil -->
  <button @click="toggleSidebar" class="sm:hidden m-3 p-2 rounded-md border hover:bg-gray-100">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <!-- Overlay -->
  <div v-if="sidebarOpen" class="fixed inset-0 bg-black/40 z-30 sm:hidden" @click="closeSidebar" />

  <!-- Sidebar -->
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r transition-transform duration-300"
    :class="[sidebarOpen ? 'translate-x-0' : '-translate-x-full', 'sm:translate-x-0']"
  >
    <div class="p-4">
      <h2 class="text-xl font-medium m-2 mb-4">
        <a :href="BACKEND_URL"> Keiner Mendoza </a>
      </h2>
      <ul class="space-y-2">
        <slot name="sidebar"></slot>
      </ul>
    </div>
  </aside>

  <!-- Contenido -->
  <main class="py-6 p-4 sm:ml-64">
    <slot />
  </main>
</template>
