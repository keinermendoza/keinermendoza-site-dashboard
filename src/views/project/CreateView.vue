<script setup>
import { onMounted, ref } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useTagStore } from '@/stores/tag'
import { useRouter } from 'vue-router'
import { postRequest } from '@/services/api'
import ProjectForm from '@/components/ProjectForm.vue'
import ImageGallerySelector from '@/components/ImageGallerySelector.vue'

const router = useRouter()
const store = useProjectStore()
const tagStore = useTagStore()

const image = ref(null)
const selectedTags = ref([])
const imagesModalIsOpen = ref(false)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
  await tagStore.init()
})

async function handleSubmit(payload) {
  console.log('edit_view', payload)

  if (image.value) {
    payload['image_id'] = image.value.id
  }
  const response = await postRequest('projects/', payload)
  backendErrors.value = response.error
  if (response.success) {
    store.add(response.data)
    router.push({ name: 'project-edit', params: { id: response.data.id } })
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <div>
      <h1>Novo Porjeto</h1>
    </div>
    <ProjectForm
      :backendErrors="backendErrors"
      :availableTags="tagStore?.data"
      :selectedImage="image"
      v-model:selectedTags="selectedTags"
      @onOpenImageModal="imagesModalIsOpen = true"
      @onSubmit="handleSubmit"
    />
  </div>
  <ImageGallerySelector v-model:isOpen="imagesModalIsOpen" @update:selectedImage="image = $event" />
</template>
