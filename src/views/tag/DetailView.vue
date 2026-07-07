<script setup>
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useProjectStore } from '@/stores/project'

const route = useRoute()
const store = useProjectStore()
const tag = ref(null)

onMounted(async () => {
  await store.init()
  tag.value = store.get(route.params.id)
})
</script>

<template>
  <WrapperComponent :error="store.error">
    <h1>Hola, me alegra verte por aqui!</h1>
    <p>mira mis codigos</p>
    <p v-if="store?.isLoading">carregando</p>
    <code v-else>
      {{ tag }}
    </code>
  </WrapperComponent>
</template>
