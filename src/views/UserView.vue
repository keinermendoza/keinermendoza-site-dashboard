<script setup>
import { useFetcher } from '@/composables/fetcher'
import WrapperComponent from '@/components/WrapperComponent.vue'

const { error, data: currentUser } = useFetcher('user')
</script>

<template>
  <WrapperComponent :error="error">
    <h1>Hola, me alegra verte por aqui!</h1>
    <p>mira mis codigos</p>
    <code>
      {{ currentUser }}
    </code>
  </WrapperComponent>
</template>
