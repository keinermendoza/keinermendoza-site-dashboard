<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { patchRequest } from '@/services/api'
import SkillForm from '@/components/forms/SkillForm.vue'
import { useSkillStore } from '@/stores/Skill'
import LinkBack from '@/components/LinkBack.vue'

const route = useRoute()
const store = useSkillStore()
const instance = ref(null)
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
  instance.value = store.get(route.params.id)
})

async function handleSubmit(payload) {
  const response = await patchRequest('skills/' + instance.value.id, payload)
  backendErrors.value = response.error
  if (response.success) store.update(response.data)
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div v-if="instance">
    <h1>Editando {{ instance.name }}</h1>
  </div>
  <SkillForm
    v-if="instance"
    :initialValues="instance"
    :backendErrors="backendErrors"
    @onSubmit="handleSubmit"
  />
</template>
