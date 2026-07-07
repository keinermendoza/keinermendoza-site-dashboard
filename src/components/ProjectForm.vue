<script setup>
import { ref, reactive } from 'vue'
import { Form } from '@primevue/forms'
import { Message, InputText, Button } from 'primevue'
import ToggleSwitch from 'primevue/toggleswitch'
import MessageError from '@/components/MessageError.vue'
import MultiSelect from 'primevue/multiselect'
import TinyEditor from '@/components/TinyEditor.vue'

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

const onFormSubmit = async ({ values }) => {
  values['content'] = editorContent.value
  emit('onSubmit', values)
}

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
      class="flex flex-col gap-4 w-full"
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
        <label for="title">Titulo</label>
        <InputText
          id="title"
          v-model="formValues.title"
          @update:modelValue="formValues.slug = generateSlug($event)"
        />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="title" />
      </div>

      <!-- Slug -->
      <div class="flex flex-col gap-1">
        <label for="slug">Slug</label>

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
        <MultiSelect
          v-model="selectedTags"
          :options="props.availableTags?.tags"
          optionLabel="title"
          optionValue="id"
          filter
          placeholder="Esclhe as categorias"
          :maxSelectedLabels="5"
          class="w-full md:w-80"
          name="tags"
        />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="tags" />
      </div>

      <!-- Imagem -->
      <div class="flex flex-col gap-1">
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
          @click="emit('onOpenImageModal')"
          :label="props?.selectedImage ? 'Alterar Imagem' : 'Escolher Imagem'"
        />
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="image_id" />
      </div>
      <!-- Conteudo -->
      <div class="flex flex-col gap-1">
        <TinyEditor v-model="editorContent" />
        <!-- <InputText name="content" type="text" placeholder="content" fluid /> -->
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="content" />
      </div>

      <!-- Vsibilidade -->
      <div class="flex flex-col gap-1">
        <label class="flex gap-2 items-center">
          <ToggleSwitch id="is_public" name="is_public" />
          <small>É público</small>
        </label>
        <MessageError :form="$form" :backendErrors="backendErrors" fieldName="is_public" />
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
