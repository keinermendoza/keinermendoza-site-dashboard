<script setup>
import { onMounted, ref } from 'vue'
import { patchRequest } from '@/services/api'
import TagForm from '@/components/forms/TagForm.vue'
import { useTagStore } from '@/stores/tag'
import LinkBack from '@/components/LinkBack.vue'
import { useToast } from 'primevue/usetoast'
import { baseMessage } from '@/composables/utils'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const route = useRoute()
const store = useTagStore()
const instance = ref(null)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
  instance.value = store.get(route.params.id)
})

async function handleSubmit(payload) {
  const response = await patchRequest('tags/' + instance.value.id, payload)
  backendErrors.value = response.error
  // if (response.success) store.update(response.data)
  if (response.success) {
    store.update(response.data)
    toast.add({ ...baseMessage, detail: 'Categoria atualizada com sucesso' })
    router.push({ name: 'tag-list' })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div v-if="instance" class="mb-4">
    <h1 class="text-2xl font-medium">Categoria: {{ instance.name }}</h1>
  </div>
  <TagForm
    v-if="instance"
    :initialValues="instance"
    :backendErrors="backendErrors"
    @onSubmit="handleSubmit"
  />
</template>
