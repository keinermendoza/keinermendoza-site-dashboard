<script setup>
import { onMounted, ref } from 'vue'
import { useDocumentStore } from '@/stores/document'
import { useRoute } from 'vue-router'
import { patchRequest } from '@/services/api'
import DocumentForm from '@/components/forms/DocumentForm.vue'
import { Button } from 'primevue'
import LinkBack from '@/components/LinkBack.vue'

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
  if (response.success) store.update(response.data)
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div v-if="instance">
    <h1>Editando {{ instance.title }}</h1>
    <Button as="a" :href="instance?.file" severity="primary" label="Baixar documento" />
  </div>
  <DocumentForm
    v-if="instance"
    :initialValues="instance"
    :backendErrors="backendErrors"
    @submit="handleSubmit"
  />
</template>
