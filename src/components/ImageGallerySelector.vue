<script setup>
import { ref, watchEffect } from 'vue'
import { Button } from 'primevue'
import Dialog from 'primevue/dialog'
import WrapperComponent from '@/components/WrapperComponent.vue'
import { useImageStore } from '@/stores/image'
import ImageForm from './forms/ImageForm.vue'
import { postRequest } from '@/services/api.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  selectedImage: {
    type: Object,
  },
})
const emit = defineEmits(['update:isOpen', 'update:selectedImage'])
const store = useImageStore()

const createFormIsVisible = ref(false)

// Aguarda o modal abrir para fazer a requisição ao endpoint de imagens.
// A requisição só é feita se os dados não estiverem cacheados.
const stop = watchEffect(async () => {
  if (props.isOpen) {
    store.init()
    stop()
  }
})

// formulario e preview
const imagePreview = ref(null)
const backendErrors = ref(null)
function handleUpdatePreview(imageBlob) {
  imagePreview.value = imageBlob
}

async function handleSubmit(payload) {
  const response = await postRequest('images', payload)
  backendErrors.value = response.error
  if (response.success) {
    store.add(response.data)
    // selecionando imagem recem criada
    emit('update:selectedImage', response.data)
  }
}
</script>

<template>
  <WrapperComponent :error="store?.error">
    <Dialog
      :visible="props.isOpen"
      @update:visible="emit('update:isOpen', $event)"
      dismissableMask="true"
      modal
      header="Seleciona Imagem"
      class="w-full max-w-6xl mx-4"
    >
      <!-- botão adicionar imagem -->
      <div class="mb-4">
        <Button
          severity="info"
          aria-describedby="help-add-image"
          @click="createFormIsVisible = !createFormIsVisible"
        >
          <svg
            v-if="createFormIsVisible"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span v-if="createFormIsVisible">Ocultar formulario</span>
          <span v-else>Adicionar imagem</span>
        </Button>
        <p v-if="!createFormIsVisible" class="mt-2" id="help-add-image">
          Não encontrou a imagem que queria? Use o botão acima para adicionar uma nova imagem à
          galeria.
        </p>
      </div>

      <!-- formulario para adicionar nova imagem -->
      <div v-if="createFormIsVisible" class="mb-4 border border-black/50 rounded-xl p-4">
        <img v-if="imagePreview" :src="imagePreview" alt="previzualisação de imagem" />
        <ImageForm
          :backendErrors="backendErrors"
          @submit="handleSubmit"
          @onUpdateImagePreview="handleUpdatePreview"
        />
      </div>

      <!-- galeria para seleccionar imagem -->
      <div v-if="store?.images" class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        <div
          @click="emit('update:selectedImage', image)"
          v-for="image in store.images"
          class="border-4 rounded-xl border-solid cursor-pointer"
          :class="props.selectedImage?.id === image.id ? 'border-green-500' : 'border-transparent'"
          :key="image.id"
        >
          <img
            class="object-cover object-center w-full h-40 aspect-square max-w-full rounded-lg"
            :src="image.image"
            :alt="image.description"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Fechar"
          severity="secondary"
          @click="emit('update:isOpen', false)"
        ></Button>
      </div>
    </Dialog>
  </WrapperComponent>
</template>
