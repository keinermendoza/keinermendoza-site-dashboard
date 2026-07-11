<script setup>
import { onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { postRequest } from '@/services/api'
import ImageForm from '@/components/forms/ImageForm.vue'
import LinkBack from '@/components/LinkBack.vue'

const store = useImageStore()
const imagePreview = ref(null)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
})

function handleUpdatePreview(imageBlob) {
  imagePreview.value = imageBlob
}

async function handleSubmit(payload) {
  const response = await postRequest('images', payload)
  backendErrors.value = response.error
  if (response.success) store.add(response.data)
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div>
    <h1>Nova Imagem</h1>
    <img v-if="imagePreview" :src="imagePreview" alt="Previsualização de imagem" />
  </div>
  <ImageForm
    :backendErrors="backendErrors"
    @submit="handleSubmit"
    @onUpdateImagePreview="handleUpdatePreview"
  />
</template>
