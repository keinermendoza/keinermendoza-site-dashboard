<script setup>
import { onMounted, ref } from 'vue'
import { useTagStore } from '@/stores/tag'
import { postRequest } from '@/services/api'
import TagForm from '@/components/forms/TagForm.vue'
import { useRouter } from 'vue-router'
import LinkBack from '@/components/LinkBack.vue'
import { useToast } from 'primevue/usetoast'
import { baseMessage } from '@/composables/utils'

const toast = useToast()
const router = useRouter()
const store = useTagStore()
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
})

async function handleSubmit(payload) {
  console.log(payload)
  const response = await postRequest('tags', payload)
  backendErrors.value = response.error
  if (response.success) {
    store.add(response.data)
    toast.add({ ...baseMessage, detail: 'Categoria criada com Sucesso' })
    router.push({ name: 'tag-edit', params: { id: response.data.id } })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div class="mb-4">
    <h1 class="text-2xl font-medium">Nova Categoria (Tag)</h1>
  </div>
  <TagForm :backendErrors="backendErrors" @onSubmit="handleSubmit" />
</template>
