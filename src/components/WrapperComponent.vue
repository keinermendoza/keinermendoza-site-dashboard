<script setup>
defineProps({
  error: {
    type: [String, Object, null],
    default: null,
  },
})
</script>

<template>
  <div v-if="error" class="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
    <div class="bg-red-50 p-4 rounded-full text-red-600 mb-4">
      <svg
        class="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z"
        />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-1">No se pudieron cargar los datos</h3>
    <p class="text-sm text-gray-500 max-w-sm mb-4">
      {{
        error === true || typeof error === 'object'
          ? 'No es posible conectar con el servidor en este momento.'
          : error
      }}
    </p>
  </div>

  <slot v-else />
</template>
