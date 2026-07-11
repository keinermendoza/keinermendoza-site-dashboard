<script setup>
import WrapperComponent from '@/components/WrapperComponent.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted } from 'vue'
import { Button } from 'primevue'
import { useTagStore } from '@/stores/tag'
import IsSvg from '@/components/IsSvg.vue'

// import Dialog from 'primevue/dialog'
// import { ref } from 'vue'
// import { deleteRequest } from '@/services/api'

// const deleteModalIsVisible = ref(false)
// const selectedUser = ref(null)
const store = useTagStore()

// function selectUserForDeletion(userId) {
//   selectedUser.value = store.get(userId)
//   deleteModalIsVisible.value = true
// }

// async function requestUserDeletion() {
//   const { success } = await deleteRequest('users/' + selectedUser.value.id)
//   if (success) store.remove(selectedUser.value.id)
//   deleteModalIsVisible.value = false
// }

onMounted(() => {
  store.init()
})
</script>

<template>
  <WrapperComponent :error="store.error">
    <p v-if="store.isLoading">carregando...</p>
    <DataTable v-else :value="store.tags" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Categorias</span>
          <Button
            icon="pi pi-refresh"
            as="router-link"
            :to="{ name: 'tag-create' }"
            label="Cadastrar Novo"
            rounded
            raised
          />
        </div>
      </template>
      <Column field="title" header="Titulo"></Column>
      <Column field="description" header="Descrição"></Column>
      <Column header="É público">
        <template #body="slotProps">
          <IsSvg :is="slotProps.data.is_public" />
        </template>
      </Column>
      <!-- <Column field="created_at" header="Cadastrado em"></Column>
      <Column field="updated_at" header="Atualizado em"></Column> -->
      <Column header="Ações">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <RouterLink :to="{ name: 'tag-detail', params: { id: slotProps.data.id } }"
              >ver</RouterLink
            >
            <RouterLink :to="{ name: 'tag-edit', params: { id: slotProps.data.id } }"
              >editar</RouterLink
            >
            <!-- <Button label="Eliminar" @click="selectUserForDeletion(slotProps.data.id)" /> -->
          </div>
        </template>
      </Column>
    </DataTable>
    <!--
    <div class="card flex justify-center">
      <Dialog
        v-model:visible="deleteModalIsVisible"
        modal
        header="Eliminar Usuario"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
          >Tem certeza que deseja eliminar ao usuario <strong>{{ selectedUser.name }}?</strong>
        </span>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="deleteModalIsVisible = false"
          ></Button>
          <Button type="button" label="Deletar" @click="requestUserDeletion()"></Button>
        </div>
      </Dialog>
    </div> -->
  </WrapperComponent>
</template>
