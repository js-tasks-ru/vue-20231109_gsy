<template>
  <div class="image-uploader" @click="onClick">
    <label class="image-uploader__preview" :class="previewClasses" :style="previewStyle">
      <span class="image-uploader__text">{{ text }}</span>
      <input class="image-uploader__input" type="file" accept="image/*" ref="input" v-bind="$attrs"
        @change="onInputChange" />
    </label>
  </div>
</template>

<script>
  export default {
    name: 'UiImageUploader',
    inheritAttrs: false,
  };
</script>

<script setup>
  import { ref, computed, onBeforeMount } from 'vue';

  const props = defineProps({
    preview: {
      type: String,
      default: '',
    },
    uploader: {
      type: Function,
      default: null,
    }
  });

  const emit = defineEmits([
    'select', // Выбран новый файл.
    'upload', // Файл успешно загружен.
    'remove', // Изображение удалено.
    'error'   // Возника ошибка.
  ]);

  // Поле ввода компонента.
  const input = ref(null);

  // Текущее изображение.
  const image = ref('');

  // Индикатор процесса обработки.
  const busy = ref(false);

  // Состояние компонета.
  const state = computed(() => {
    if (busy.value) return 'loading';
    if (image.value) return 'filled';
    return 'empty';
  });

  // Отображаемый текс на превью.
  const text = computed(() => {
    switch (state.value) {
      case 'loading': return 'Загрузка...';
      case 'filled': return 'Удалить изображение';
      case 'empty': return 'Загрузить изображение';
      default: return '...';
    }
  });

  // Стилевые настройки для превью-блока.
  const previewStyle = computed(() => {
    return { '--bg-url': image.value ? `url('${image.value}')` : null };
  });

  // Стилевые классы для превью-блока.
  const previewClasses = computed(() => {
    return state.value === 'loading' ? ['image-uploader__preview-loading'] : [];
  });

  // Обработать событие перед отображением компонента.
  onBeforeMount(() => {
    image.value = props.preview;
  });

  // Обработать нажатие на компонент.
  function onClick(evt) {
    if (state.value === 'empty') return;
    if (state.value === 'filled') removeFile();
    evt.preventDefault();
  }

  // Обработать изменение значения в поле ввода.
  async function onInputChange(evt) {
    let file = null;
    let resp = null;

    if (!evt.target.files.length) return;
    else file = evt.target.files[0];

    emit('select', file);

    if (!props.uploader) {
      image.value = URL.createObjectURL(file);
      return;
    }

    try {
      busy.value = true;
      resp = await props.uploader(file);
      emit('upload', resp);
    } catch (err) {
      input.value.value = '';
      emit('error', err);
    }

    image.value = resp?.image;
    busy.value = false;
  }

  // Удалить выбранный файл.
  function removeFile() {
    image.value = '';
    input.value.value = '';
    emit('remove');
  }
</script>

<style scoped>

  .image-uploader__input {
    opacity: 0;
    height: 0;
  }

  .image-uploader__preview {
    /* Это выражение ломает авто-тест: */
    /* --bg-url: v-bind('image ? "url(" + image + ")" : "var(--default-cover)"'); */
    --bg-url: var(--default-cover);
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
    border: 2px solid var(--blue-light);
    border-radius: 8px;
    transition: 0.2s border-color;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 512px;
    height: 228px;
  }

  .image-uploader__text {
    color: var(--white);
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }

  .image-uploader__preview:hover {
    border-color: var(--blue);
  }

  .image-uploader__preview.image-uploader__preview-loading {
    cursor: no-drop;
  }
</style>
