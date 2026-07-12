<script setup>
import WrapperComponent from '@/components/WrapperComponent.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import { Button } from 'primevue'
import { useProjectStore } from '@/stores/project'
import IsSvg from '@/components/IsSvg.vue'
import Badge from 'primevue/badge'
import { deleteRequest } from '@/services/api'
import DeleteModal from '@/components/DeleteModal.vue'

const store = useProjectStore()
const selectedItem = ref(null)
const deleteModalIsVisible = ref(false)

function selectForDeletion(id) {
  selectedItem.value = store.get(id)
  deleteModalIsVisible.value = true
}

async function requestDeletion() {
  const { success } = await deleteRequest('projects/' + selectedItem.value.id)
  if (success) store.remove(selectedItem.value.id)
  deleteModalIsVisible.value = false
}

onMounted(() => {
  store.init()
})
</script>

<template>
  <WrapperComponent :error="store.error">
    <p v-if="store.isLoading">carregando...</p>
    <DataTable v-else :value="store.projects" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Projetos</span>
          <Button
            icon="pi pi-refresh"
            as="router-link"
            :to="{ name: 'project-create' }"
            label="Cadastrar Novo"
            rounded
            raised
          />
        </div>
      </template>
      <Column field="title" header="Titulo"></Column>
      <Column field="slug" header="Slug"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.image"
            :src="slotProps.data.image.image"
            :alt="slotProps.data.image.description"
            class="w-16 aspect-square rounded"
          />
          <span v-else>No image</span>
        </template>
      </Column>
      <Column header="É público">
        <template #body="slotProps">
          <IsSvg :is="slotProps.data.is_public" />
        </template>
      </Column>
      <Column header="Categorias">
        <template #body="slotProps">
          <div class="flex flex-wrap items-center gap-1">
            <Badge v-for="tag in slotProps.data?.tags" :key="tag.id" :value="tag.title" />
          </div>
        </template>
      </Column>
      <Column field="importance" header="Importância"></Column>
      <Column field="created_at" header="Registrado"></Column>
      <Column field="updated_at" header="Atualizado"></Column>
      <Column header="Ações">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <RouterLink :to="{ name: 'project-detail', params: { id: slotProps.data.id } }"
              >ver</RouterLink
            >
            <RouterLink :to="{ name: 'project-edit', params: { id: slotProps.data.id } }"
              >editar</RouterLink
            >
            <Button
              severity="danger"
              label="Eliminar"
              @click="selectForDeletion(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <DeleteModal @onDelete="requestDeletion" v-model:visible="deleteModalIsVisible">
      Tem certeza que deseja eliminar o projeto <strong>{{ selectedItem?.title }}?</strong>
    </DeleteModal>
  </WrapperComponent>
</template>
