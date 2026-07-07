<script setup>
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useProjectStore } from '@/stores/project'

const route = useRoute()
const projectStore = useProjectStore()
const project = ref(null)

onMounted(async () => {
  await projectStore.init()
  project.value = projectStore.get(route.params.id)
})
</script>

<template>
  <WrapperComponent :error="projectStore.error">
    <h1>Hola, me alegra verte por aqui!</h1>
    <p>mira mis codigos</p>
    <p v-if="userStore?.isLoading">carregando</p>
    <code v-else>
      {{ project }}
    </code>
  </WrapperComponent>
</template>
