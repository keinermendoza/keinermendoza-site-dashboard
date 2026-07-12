<script setup>
// https://tiptap.dev/docs/editor/getting-started/install/vue3#use-v-model-optional
import { ref, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'
import TipTapBtn from './TipTapBtn.vue'
import ImageGallerySelector from './ImageGallerySelector.vue'
import Image from '@tiptap/extension-image'

const modelValue = defineModel({
  type: String,
  default: '',
})

const editor = useEditor({
  extensions: [
    StarterKit,
    Image,
    Youtube.configure({
      controls: false,
      nocookie: true,
    }),
  ],
  content: modelValue.value,
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML()
  },
  editorProps: {
    attributes: {
      class:
        'prose lg:prose-xl max-w-none min-h-[200px] w-full rounded-md bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-50',
    },
  },
})
// mantem o estado do conteudo atualizado e em HTML
watch(modelValue, (value) => {
  if (!editor.value) return

  const isSame = editor.value.getHTML() === value

  if (isSame) {
    return
  }

  editor.value.commands.setContent(value)
})

// Estado do modal de imagens
const imageModalIsOpen = ref(false)

function handleInsertImage(imageObj) {
  editor.value
    .chain()
    .focus()
    .setImage({
      src: imageObj.image,
      alt: imageObj.description,
      title: imageObj.description,
    })
    .run()
}

function addVideo() {
  const url = prompt('Ingrese la URL de YouTube')

  if (!url) return

  editor.value?.commands.setYoutubeVideo({
    src: url,
    width: 640,
    height: 480,
  })
}
</script>

<template>
  <ImageGallerySelector
    v-model:isOpen="imageModalIsOpen"
    @update:selectedImage="handleInsertImage"
  />
  <div class="border border-gray-300 rounded-md p-4">
    <!-- Barra de Herramientas -->
    <div v-if="editor" class="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-2">
      <TipTapBtn @click="imageModalIsOpen = true"> Image </TipTapBtn>
      <TipTapBtn @click="addVideo"> Agregar video </TipTapBtn>

      <TipTapBtn
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :isActive="editor.isActive('bold')"
      >
        Bold
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :isActive="editor.isActive('italic')"
      >
        Italic
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :isActive="editor.isActive('strike')"
      >
        Strike
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :isActive="editor.isActive('code')"
      >
        Code
      </TipTapBtn>
      <TipTapBtn @click="editor.chain().focus().unsetAllMarks().run()">Clear marks</TipTapBtn>
      <TipTapBtn @click="editor.chain().focus().clearNodes().run()">Clear nodes</TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().setParagraph().run()"
        :isActive="editor.isActive('paragraph')"
      >
        Paragraph
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :isActive="editor.isActive('heading', { level: 1 })"
      >
        H1
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :isActive="editor.isActive('heading', { level: 2 })"
      >
        H2
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :isActive="editor.isActive('heading', { level: 3 })"
      >
        H3
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :isActive="editor.isActive('heading', { level: 4 })"
      >
        H4
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :isActive="editor.isActive('heading', { level: 5 })"
      >
        H5
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :isActive="editor.isActive('heading', { level: 6 })"
      >
        H6
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleBulletList().run()"
        :isActive="editor.isActive('bulletList')"
      >
        Bullet list
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleOrderedList().run()"
        :isActive="editor.isActive('orderedList')"
      >
        Ordered list
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :isActive="editor.isActive('codeBlock')"
      >
        Code block
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().toggleBlockquote().run()"
        :isActive="editor.isActive('blockquote')"
      >
        Blockquote
      </TipTapBtn>
      <TipTapBtn @click="editor.chain().focus().setHorizontalRule().run()"
        >Horizontal rule</TipTapBtn
      >
      <TipTapBtn @click="editor.chain().focus().setHardBreak().run()">Hard break</TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        Undo
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        Redo
      </TipTapBtn>
      <TipTapBtn
        @click="editor.chain().focus().setColor('#958DF1').run()"
        :isActive="editor.isActive('textStyle', { color: '#958DF1' })"
      >
        Purple
      </TipTapBtn>
    </div>

    <!-- Contenido del Editor -->
    <EditorContent :editor="editor" />
  </div>
</template>
