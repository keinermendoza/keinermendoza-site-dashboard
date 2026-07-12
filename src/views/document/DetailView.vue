<script setup>
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useDocumentStore } from '@/stores/document'

const route = useRoute()
const store = useDocumentStore()
const document = ref(null)

onMounted(async () => {
  await store.init()
  document.value = store.get(route.params.id)
})
</script>

<template>
  <WrapperComponent :error="store.error">
    <h1>Hola, me alegra verte por aqui!</h1>
    <p>mira mis codigos</p>
    <p v-if="store.isLoading">carregando</p>
    <code v-else>
      {{ document }}
    </code>
  </WrapperComponent>
</template>
