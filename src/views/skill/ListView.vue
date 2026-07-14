<script setup>
import { useSkillStore } from '@/stores/skill'
import WrapperComponent from '@/components/WrapperComponent.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted } from 'vue'
import { Button } from 'primevue'
// import Dialog from 'primevue/dialog'
// import { ref } from 'vue'
// import { deleteRequest } from '@/services/api'
import IsSvg from '@/components/IsSvg.vue'

// const deleteModalIsVisible = ref(false)
const store = useSkillStore()
// const selectedskill = ref(null)

// function selectskillForDeletion(skillId) {
//   selectedskill.value = store.get(skillId)
//   deleteModalIsVisible.value = true
// }

// async function requestskillDeletion() {
//   const { success } = await deleteRequest('skills/' + selectedskill.value.id)
//   if (success) store.remove(selectedskill.value.id)
//   deleteModalIsVisible.value = false
// }

onMounted(() => {
  store.init()
})
</script>

<template>
  <WrapperComponent :error="store.error">
    <p v-if="store.isLoading">carregando...</p>
    <DataTable v-else :value="store.skills" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Skills</span>
          <Button
            icon="pi pi-refresh"
            as="router-link"
            :to="{ name: 'skill-create' }"
            label="Cadastrar Novo"
            rounded
            raised
          />
        </div>
      </template>
      <Column field="title" header="Nome"></Column>
      <Column header="svg">
        <template #body="slotProps">
          <div v-if="slotProps.data?.svg" v-html="slotProps.data.svg"></div>
        </template>
      </Column>
      <Column field="created_at" header="Criada"></Column>
      <Column field="updated_at" header="Atualizada"></Column>
      <Column header="É público">
        <template #body="slotProps">
          <IsSvg :is="slotProps.data.is_public" />
        </template>
      </Column>
      <Column header="Ações">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <!-- <RouterLink :to="{ name: 'skill-detail', params: { id: slotProps.data.id } }"
              >ver</RouterLink
            > -->

            <Button
              as="RouterLink"
              :to="{ name: 'skill-edit', params: { id: slotProps.data.id } }"
              label="Editar"
              severity="info"
            />
            <!-- <RouterLink>editar</RouterLink> -->
            <!-- <Button label="Eliminar" @click="selectskillForDeletion(slotProps.data.id)" /> -->
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- <div class="card flex justify-center">
      <Dialog
        v-model:visible="deleteModalIsVisible"
        modal
        header="Eliminar Usuario"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
          >Tem certeza que deseja eliminar ao usuario <strong>{{ selectedskill.name }}?</strong>
        </span>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="deleteModalIsVisible = false"
          ></Button>
          <Button type="button" label="Deletar" @click="requestskillDeletion()"></Button>
        </div>
      </Dialog>
    </div> -->
  </WrapperComponent>
</template>
