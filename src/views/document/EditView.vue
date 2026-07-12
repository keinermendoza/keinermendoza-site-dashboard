<script setup>
import { onMounted, ref } from 'vue'
import { useDocumentStore } from '@/stores/document'

import { patchRequest } from '@/services/api'
import DocumentForm from '@/components/forms/DocumentForm.vue'
import { Button } from 'primevue'
import LinkBack from '@/components/LinkBack.vue'
import { useToast } from 'primevue/usetoast'
import { baseMessage } from '@/composables/utils'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const route = useRoute()
const store = useDocumentStore()
const instance = ref(null)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
  instance.value = store.get(route.params.id)
})

async function handleSubmit(payload) {
  const response = await patchRequest('documents/' + instance.value.id, payload)
  backendErrors.value = response.error
  // if (response.success) store.update(response.data)
  if (response.success) {
    store.add(response.data)
    toast.add({ ...baseMessage, detail: 'Documento atualizado com sucesso' })
    router.push({ name: 'document-edit', params: { id: response.data.id } })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div class="mb-4" v-if="instance">
    <h1 class="text-2xl font-medium">Editando {{ instance.title }}</h1>
    <Button as="a" :href="instance?.file" severity="primary" label="Baixar documento" />
  </div>
  <DocumentForm
    v-if="instance"
    :initialValues="instance"
    :backendErrors="backendErrors"
    @submit="handleSubmit"
  />
</template>
