<script setup>
// https://tiptap.dev/docs/editor/getting-started/install/vue3#use-v-model-optional
import { ref, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'
import TipTapBtn from './TipTapBtn.vue'
import ImageGallerySelector from './ImageGallerySelector.vue'
import Image from '@tiptap/extension-image'

import Dialog from 'primevue/dialog'
import { Button } from 'primevue'

// import Link from '@tiptap/extension-link'

// Function to add a link via a prompt
// const setLink = () => {
//   const url = window.prompt('Enter URL')

//   // cancelled
//   if (url === null) {
//     return
//   }

//   // empty
//   if (url === '') {
//     editor.value.chain().focus().unsetLink().run()
//     return
//   }

//   // update link
//   editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
// }

const modelValue = defineModel({
  type: String,
  default: '',
})

const editor = useEditor({
  extensions: [
    StarterKit,
    Image,
    // Link.configure({
    //   openOnClick: true, // Opens the link when clicked
    //   autolink: true, // Automatically turns pasted URLs into links
    //   linkOnPaste: true, // Auto links URLs on paste
    // }),
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
    <div v-if="editor" class="flex flex-col gap-2 mb-4 border-b border-gray-200 pb-2">
      <div class="flex flex-wrap gap-10 justify-between">
        <div class="flex flex-wrap gap-2">
          <TipTapBtn
            aria-label="desfazer"
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >
            <svg
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </TipTapBtn>
          <TipTapBtn
            aria-label="refazer"
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
          >
            <svg
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
                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
              />
            </svg>
          </TipTapBtn>
        </div>
        <div class="flex flex-wrap gap-2">
          <TipTapBtn @click="addVideo" aria-label="adicionar video">
            <svg
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
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </TipTapBtn>
          <TipTapBtn @click="imageModalIsOpen = true" aria-label="adicionar imagem">
            <svg
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </TipTapBtn>

          <TipTapBtn
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :isActive="editor.isActive('codeBlock')"
          >
            <svg
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
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </TipTapBtn>

          <TipTapBtn
            aria-label="quote"
            @click="editor.chain().focus().toggleBlockquote().run()"
            :isActive="editor.isActive('blockquote')"
          >
            <svg
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
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </TipTapBtn>
        </div>
      </div>

      <div class="flex flex-wrap gap-12 justify-between">
        <div class="flex flex-wrap gap-2">
          <TipTapBtn
            aria-label="encabezado 1"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :isActive="editor.isActive('heading', { level: 1 })"
          >
            H1
          </TipTapBtn>
          <TipTapBtn
            aria-label="encabezado 2"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :isActive="editor.isActive('heading', { level: 2 })"
          >
            H2
          </TipTapBtn>
          <TipTapBtn
            aria-label="encabezado 3"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :isActive="editor.isActive('heading', { level: 3 })"
          >
            H3
          </TipTapBtn>
          <TipTapBtn
            aria-label="encabezado 4"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :isActive="editor.isActive('heading', { level: 4 })"
          >
            H4
          </TipTapBtn>
          <TipTapBtn
            aria-label="paragrafo"
            @click="editor.chain().focus().setParagraph().run()"
            :isActive="editor.isActive('paragraph')"
          >
            <span class="px-1.5">p</span>
          </TipTapBtn>
        </div>

        <div class="flex flex-wrap gap-2">
          <TipTapBtn
            aria-label="unorder list"
            @click="editor.chain().focus().toggleBulletList().run()"
            :isActive="editor.isActive('bulletList')"
          >
            <svg
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
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </TipTapBtn>
          <TipTapBtn
            aria-label="order list"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :isActive="editor.isActive('orderedList')"
          >
            <svg
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
                d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
              />
            </svg>
          </TipTapBtn>

          <TipTapBtn @click="editor.chain().focus().setHorizontalRule().run()">
            <svg class="size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="12" x2="24" y2="12" stroke="black" />
            </svg>
          </TipTapBtn>
        </div>

        <div class="flex flex-wrap gap-2">
          <TipTapBtn @click="editor.chain().focus().unsetAllMarks().run()">
            <svg
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
                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
              />
            </svg>
          </TipTapBtn>

          <TipTapBtn
            aria-label="bold"
            @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :isActive="editor.isActive('bold')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linejoin="round"
                d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z"
              />
            </svg>
          </TipTapBtn>
          <TipTapBtn
            aria-label="italic"
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :isActive="editor.isActive('italic')"
          >
            <svg
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
                d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803"
              />
            </svg>
          </TipTapBtn>
          <TipTapBtn
            aria-label="strike"
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :isActive="editor.isActive('strike')"
          >
            <svg
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
                d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5"
              />
            </svg>
          </TipTapBtn>
        </div>
      </div>
    </div>

    <!-- Contenido del Editor -->
    <EditorContent :editor="editor" />
  </div>
</template>
