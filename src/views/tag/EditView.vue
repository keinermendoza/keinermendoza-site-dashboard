<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { patchRequest } from '@/services/api'
import TagForm from '@/components/forms/TagForm.vue'
import { useTagStore } from '@/stores/tag'
import LinkBack from '@/components/LinkBack.vue'

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
  if (response.success) store.update(response.data)
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div v-if="instance">
    <h1>Editando {{ instance.name }}</h1>
  </div>
  <TagForm
    v-if="instance"
    :initialValues="instance"
    :backendErrors="backendErrors"
    @onSubmit="handleSubmit"
  />
</template>
