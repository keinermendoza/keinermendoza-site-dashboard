<script setup>
import { onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { postRequest } from '@/services/api'
import DocumentForm from '@/components/forms/DocumentForm.vue'
import LinkBack from '@/components/LinkBack.vue'
import { useToast } from 'primevue/usetoast'
import { baseMessage } from '@/composables/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const store = useImageStore()
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
})

async function handleSubmit(payload) {
  const response = await postRequest('documents', payload)
  backendErrors.value = response.error
  // if (response.success) store.add(response.data)
  if (response.success) {
    store.add(response.data)
    toast.add({ ...baseMessage, detail: 'documento registrado com sucesso' })
    router.push({ name: 'document-edit', params: { id: response.data.id } })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />
  <div class="mb-4">
    <h1 class="text-2xl font-medium">Subir Novo Documento</h1>
  </div>
  <DocumentForm :backendErrors="backendErrors" @submit="handleSubmit" />
</template>
