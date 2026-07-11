<script setup>
import { onMounted, ref } from 'vue'
import { useSkillStore } from '@/stores/skill'
import { postRequest } from '@/services/api'
import SkillForm from '@/components/forms/SkillForm.vue'
import { useRouter } from 'vue-router'
import LinkBack from '@/components/LinkBack.vue'

const router = useRouter()
const store = useSkillStore()
const backendErrors = ref(null)

onMounted(async () => {
  await store.init()
})

async function handleSubmit(payload) {
  console.log(payload)
  const response = await postRequest('skills', payload)
  backendErrors.value = response.error
  if (response.success) {
    store.add(response.data)
    router.push({ name: 'skill-edit', params: { id: response.data.id } })
  }
}
</script>

<template>
  <LinkBack class="mb-4" />

  <div>
    <h1>Nova Habilidade Destacada (Skill)</h1>
  </div>
  <SkillForm :backendErrors="backendErrors" @onSubmit="handleSubmit" />
</template>
