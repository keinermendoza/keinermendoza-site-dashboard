<script setup>
import { useImageStore } from '@/stores/image'
import WrapperComponent from '@/components/WrapperComponent.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted } from 'vue'
import { Button } from 'primevue'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import { deleteRequest } from '@/services/api'
import IsSvg from '@/components/IsSvg.vue'

const deleteModalIsVisible = ref(false)
const imageStore = useImageStore()
const selectedImage = ref(null)

function selectImageForDeletion(imageId) {
  selectedImage.value = imageStore.get(imageId)
  deleteModalIsVisible.value = true
}

async function requestImageDeletion() {
  const { success } = await deleteRequest('images/' + selectedImage.value.id)
  if (success) imageStore.remove(selectedImage.value.id)
  deleteModalIsVisible.value = false
}

onMounted(() => {
  imageStore.init()
})
</script>

<template>
  <WrapperComponent :error="imageStore.error">
    <p v-if="imageStore.isLoading">carregando...</p>
    <DataTable v-else :value="imageStore.images" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Galeria de Imagens</span>
          <Button
            icon="pi pi-refresh"
            as="router-link"
            :to="{ name: 'image-gallery-create' }"
            label="Subir Imagem"
            rounded
            raised
          />
        </div>
      </template>
      <Column header="Imagem">
        <template #body="slotProps">
          <img
            class="w-16 aspect-square rounded"
            :src="slotProps.data.image"
            :alt="slotProps.data.description"
          />
        </template>
      </Column>
      <Column header="Descrição">
        <template #body="slotProps">
          <span>{{ slotProps.data.description && slotProps.data.description.slice(0, 12) }}</span>
        </template>
      </Column>
      <Column header="É público">
        <template #body="slotProps">
          <IsSvg :is="slotProps.data.is_public" />
        </template>
      </Column>
      <Column field="created_at" header="Criada"></Column>
      <Column field="updated_at" header="Atualizada"></Column>
      <Column header="Ações">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <!-- <RouterLink :to="{ name: 'image-gallery-detail', params: { id: slotProps.data.id } }"
              >ver</RouterLink
            > -->
            <Button
              as="RouterLink"
              :to="{ name: 'image-gallery-edit', params: { id: slotProps.data.id } }"
              label="Editar"
              severity="info"
            />
            <Button
              severity="danger"
              label="Eliminar"
              @click="selectImageForDeletion(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <div class="card flex justify-center">
      <Dialog
        v-model:visible="deleteModalIsVisible"
        modal
        header="Eliminar Usuario"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
          >Tem certeza que deseja eliminar ao usuario <strong>{{ selectedImage.name }}?</strong>
        </span>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="deleteModalIsVisible = false"
          ></Button>
          <Button
            severity="danger"
            type="button"
            label="Deletar"
            @click="requestImageDeletion()"
          ></Button>
        </div>
      </Dialog>
    </div>
  </WrapperComponent>
</template>
