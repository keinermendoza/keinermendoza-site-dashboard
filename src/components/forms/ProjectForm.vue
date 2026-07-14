<script setup>
import { ref, reactive } from 'vue'
import { Form } from '@primevue/forms'
import { Message, InputText, Button } from 'primevue'
import ToggleSwitch from 'primevue/toggleswitch'
import MessageError from '@/components/MessageError.vue'
import MultiSelect from 'primevue/multiselect'
import TipTapEditor from '@/components/TipTapEditor.vue'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      title: '',
      subtitle: '',
      content: '',
      slug: '',
      is_public: true,
    }),
  },
  backendErrors: {
    type: Object,
  },

  availableTags: {
    type: Array,
  },
  selectedImage: {
    type: Object,
    required: false,
  },
})

const selectedTags = defineModel('selectedTags')
const emit = defineEmits(['onSubmit', 'onOpenImageModal'])
const formValues = reactive({
  ...props.initialValues,
})
const editorContent = ref(props.initialValues.content)
console.log(editorContent.value)

const onFormSubmit = async ({ values }) => {
  console.log(editorContent.value)
  values['content'] = editorContent.value
  emit('onSubmit', values)
}

console.log(props.availableTags)

function generateSlug(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const resolver = ({ values }) => {
  const errors = {}
  values.title = formValues.title
  values.slug = formValues.slug
  return {
    values,
    errors,
  }
}
</script>
<template>
  <div>
    <Form
      :resolver
      v-slot="$form"
      :initialValues="formValues"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-4xl"
    >
      <Message
        v-if="backendErrors && backendErrors.generalMessage"
        severity="error"
        size="small"
        variant="simple"
      >
        <p>{{ backendErrors.generalMessage }}</p>
      </Message>
      <!-- Titulo -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="title">Titulo</label>
        <InputText
          id="title"
          v-model="formValues.title"
          @update:modelValue="formValues.slug = generateSlug($event)"
        />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="title" />
      </div>

      <!-- Subtitulo -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="subtitle">Subtitulo</label>
        <InputText id="subtitle" name="subtitle" />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="subtitle" />
      </div>

      <!-- Importancia no ordenameto -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="importance">Importância</label>
        <InputText
          type="number"
          id="importance"
          name="importance"
          aria-describedby="help-importance-text"
        />
        <small id="help-importance-text"
          >Só os 3 projetos com maior pontuação serão mostrados na tela inicial.</small
        >
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="importance" />
      </div>

      <!-- Slug -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="slug">Slug</label>

        <InputText
          v-model="formValues.slug"
          id="slug"
          name="slug"
          type="text"
          placeholder="slug"
          fluid
        />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="slug" />
      </div>

      <div class="flex flex-col gap-1">
        <!-- categorias -->
        <label class="font-medium" for="tags">Categorias (Tags)</label>

        <MultiSelect
          id="tags"
          v-model="selectedTags"
          :options="props.availableTags"
          optionLabel="title"
          optionValue="id"
          filter
          placeholder="Esclhe as categorias"
          :maxSelectedLabels="5"
          class="w-full"
          name="tags"
        />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="tags" />
      </div>

      <!-- Imagem -->
      <div class="flex flex-col gap-1">
        <label class="font-medium">Imagem Principal</label>

        <template v-if="props?.selectedImage">
          <img
            class="w-full"
            :src="props?.selectedImage?.image"
            :alt="props?.selectedImage?.description"
          />
          <small class="text-green-500"> {{ props?.selectedImage?.description }} </small>
        </template>
        <template v-else>
          <p>Seleciona Imagem</p>
        </template>
        <Button
          severity="info"
          @click="emit('onOpenImageModal')"
          :label="props?.selectedImage ? 'Alterar Imagem' : 'Escolher Imagem'"
        />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="image_id" />
      </div>
      <!-- Conteudo -->
      <div class="flex flex-col gap-1">
        <label class="font-medium">Conteúdo</label>

        <TipTapEditor v-model="editorContent" />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="content" />
      </div>

      <!-- Vsibilidade -->
      <div class="flex flex-col gap-1">
        <label class="font-medium flex gap-2 items-center">
          <ToggleSwitch id="is_public" name="is_public" />
          <small>É público</small>
        </label>
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="is_public" />
      </div>
      <Button type="submit" severity="primary" label="Salvar" />
    </Form>
  </div>
</template>
