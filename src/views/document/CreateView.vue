<script setup>
import { onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { postRequest } from '@/services/api'
import DocumentForm from '@/components/DocumentForm.vue'

const store = useImageStore()
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
})

async function handleSubmit(payload) {
  const response = await postRequest('documents', payload)
  backendErrors.value = response.error
  if (response.success) store.add(response.data)
}
</script>

<template>
  <div class="card flex justify-center">
    <div>
      <h1>Subir Novo Documento</h1>
    </div>
    <DocumentForm :backendErrors="backendErrors" @submit="handleSubmit" />
  </div>
</template>
