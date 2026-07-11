<script setup>
import { onMounted, ref } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useTagStore } from '@/stores/tag'
import { useRoute, useRouter } from 'vue-router'
import { patchRequest } from '@/services/api'
import ProjectForm from '@/components/forms/ProjectForm.vue'
import ImageGallerySelector from '@/components/ImageGallerySelector.vue'
import LinkBack from '@/components/LinkBack.vue'
const route = useRoute()
const router = useRouter()

const store = useProjectStore()
const tagStore = useTagStore()

const project = ref(null)
const image = ref(null)
const selectedTags = ref([])
const imagesModalIsOpen = ref(false)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
  await tagStore.init()

  project.value = store.get(route.params.id)
  image.value = project.value.image
  selectedTags.value = project.value.tags.map((tagObject) => tagObject.id)
})

async function handleSubmit(payload) {
  console.log('edit_view', payload)

  if (image.value) {
    payload['image_id'] = image.value.id
  }
  const response = await patchRequest('projects/' + project.value.id, payload)
  backendErrors.value = response.error
  if (response.success) {
    store.update(response.data)
    router.push({ name: 'project-list' })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div>
    <h1 v-if="project">Editando porjeto {{ project.title }}</h1>
  </div>
  <ProjectForm
    v-if="project"
    :initialValues="project"
    :backendErrors="backendErrors"
    :availableTags="tagStore?.data"
    :selectedImage="image"
    v-model:selectedTags="selectedTags"
    @onOpenImageModal="imagesModalIsOpen = true"
    @onSubmit="handleSubmit"
  />
  <ImageGallerySelector
    :selectedImage="image"
    v-model:isOpen="imagesModalIsOpen"
    @update:selectedImage="image = $event"
  />
</template>
