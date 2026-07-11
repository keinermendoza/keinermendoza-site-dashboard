<script setup>
import { useUserStore } from '@/stores/user'
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
const userStore = useUserStore()
const selectedUser = ref(null)

function selectUserForDeletion(userId) {
  selectedUser.value = userStore.get(userId)
  deleteModalIsVisible.value = true
}

async function requestUserDeletion() {
  const { success } = await deleteRequest('users/' + selectedUser.value.id)
  if (success) userStore.remove(selectedUser.value.id)
  deleteModalIsVisible.value = false
}

onMounted(() => {
  userStore.init()
})
</script>

<template>
  <WrapperComponent :error="userStore.error">
    <p v-if="userStore.isLoading">carregando...</p>
    <DataTable v-else :value="userStore.users" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Usuarios</span>
          <Button
            icon="pi pi-refresh"
            as="router-link"
            :to="{ name: 'user-create' }"
            label="Cadastrar Novo"
            rounded
            raised
          />
        </div>
      </template>
      <Column field="name" header="Nome"></Column>
      <Column field="email" header="E-mail"></Column>
      <Column header="Administrador">
        <template #body="slotProps">
          <IsSvg :is="slotProps.data.is_admin" />
        </template>
      </Column>
      <Column field="created_at" header="Cadastrado em"></Column>
      <Column field="updated_at" header="Atualizado em"></Column>
      <Column header="Ações">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <RouterLink :to="{ name: 'user-detail', params: { id: slotProps.data.id } }"
              >ver</RouterLink
            >
            <RouterLink :to="{ name: 'user-edit', params: { id: slotProps.data.id } }"
              >editar</RouterLink
            >
            <Button label="Eliminar" @click="selectUserForDeletion(slotProps.data.id)" />
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
    </div>
  </WrapperComponent>
</template>
