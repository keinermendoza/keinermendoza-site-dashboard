<script setup>
import { defineEmits, defineModel } from 'vue'
import Dialog from 'primevue/dialog'
import { Button } from 'primevue'

const visible = defineModel('visible')
const emit = defineEmits(['onDelete'])
</script>
<template>
  <Dialog v-model:visible="visible" modal header="Eliminar Usuario" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">
      <slot />
    </span>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="deleteModalIsVisible = false"
      ></Button>
      <Button type="button" label="Deletar" @click="emit('onDelete')"></Button>
    </div>
  </Dialog>
</template>
