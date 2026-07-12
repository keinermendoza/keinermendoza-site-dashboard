<script setup>
import { useDocumentStore } from '@/stores/document'
import WrapperComponent from '@/components/WrapperComponent.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted } from 'vue'
import { Button } from 'primevue'
import { ref } from 'vue'
import { deleteRequest } from '@/services/api'
import IsSvg from '@/components/IsSvg.vue'
import DeleteModal from '@/components/DeleteModal.vue'

const deleteModalIsVisible = ref(false)
const store = useDocumentStore()
const selectedItem = ref(null)

function selectForDeletion(id) {
  selectedItem.value = store.get(id)
  deleteModalIsVisible.value = true
}

async function requestDeletion() {
  const { success } = await deleteRequest('documents/' + selectedItem.value.id)
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
    <DataTable v-else :value="store.data" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Documentos</span>
          <Button
            icon="pi pi-refresh"
            as="router-link"
            :to="{ name: 'document-create' }"
            label="Subir Documento"
            rounded
            raised
          />
        </div>
      </template>
      <Column field="title" header="Titulo"></Column>
      <Column header="Curriculo Selecionado">
        <template #body="slotProps">
          <IsSvg :is="slotProps.data.is_cv" />
        </template>
      </Column>
      <Column header="É público">
        <template #body="slotProps">
          <IsSvg :is="slotProps.data.is_public" />
        </template>
      </Column>
      <Column field="created_at" header="Subida em"></Column>
      <Column field="updated_at" header="Atualizada em"></Column>
      <Column header="Ações">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <RouterLink :to="{ name: 'document-detail', params: { id: slotProps.data.id } }"
              >ver</RouterLink
            >
            <RouterLink :to="{ name: 'document-edit', params: { id: slotProps.data.id } }"
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

    <div class="card flex justify-center">
      <DeleteModal @onDelete="requestDeletion" v-model:visible="deleteModalIsVisible">
        Tem certeza que deseja eliminar ao usuario
        <strong>{{ selectedItem?.title }}?</strong>
      </DeleteModal>
    </div>
  </WrapperComponent>
</template>
