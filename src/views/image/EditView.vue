<script setup>
import { onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { useRoute } from 'vue-router'
import { patchRequest } from '@/services/api'
import ImageForm from '@/components/ImageForm.vue'

const route = useRoute()
const store = useImageStore()
const imagePreview = ref(null)
const selectedImage = ref(null)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
  selectedImage.value = store.get(route.params.id)
})

function handleUpdatePreview(imageBlob) {
  imagePreview.value = imageBlob
}

async function handleSubmit(payload) {
  const response = await patchRequest('images/' + selectedImage.value.id, payload)
  backendErrors.value = response.error
  if (response.success) store.update(response.data)
}
</script>

<template>
  <div class="card flex justify-center">
    <div>
      <h1 v-if="selectedImage">Editando imagem # {{ selectedImage.id }}</h1>
      <img v-if="imagePreview" :src="imagePreview" alt="Previsualização de imagem" />
      <img v-else-if="selectedImage" :src="selectedImage.image" alt="Previsualização de imagem" />
    </div>
    <ImageForm
      :initialValues="selectedImage"
      :backendErrors="backendErrors"
      @submit="handleSubmit"
      @onUpdateImagePreview="handleUpdatePreview"
    />
  </div>
</template>
