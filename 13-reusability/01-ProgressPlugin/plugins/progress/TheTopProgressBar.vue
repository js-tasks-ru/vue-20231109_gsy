<template>
  <div class="progress" :class="{ show, failed }" :style="{ width: currentProgress + '%' }"></div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useGsap } from './useGsap.js';

// Настройки поведения/отображения.
const START_DELAY = 0.2;
const MAX_PROGRESS = 95;
const MAX_DURATION = 30;
const FINISH_DURATION = 0.5;

// Этапы прогресса.
const loaders = new Set();

// Реактивное состояние.
const currentProgress = ref(0);
const failed = ref(false);
const show = computed(() => currentProgress.value > 0);

// Настрока анимации прогресс-бара.
const progressTween = useGsap(currentProgress, {
  duration: MAX_DURATION,
  delay: START_DELAY,
  ease: 'expo.out',
});

// Настройка завершения анимации прогресс-бара.
const finishTween = useGsap(currentProgress, {
  duration: FINISH_DURATION,
});

// Публичные методы компонента.
defineExpose({
  fail,
  start,
  finish,
});

/** Сбросить прогресс, вернуть в исходное состояние. */
function reset() {
  failed.value = false;
  currentProgress.value = 0;
}

/** Начать заполнение прогресс-бара. */
function start(loader) {
  if (!loaders.size) progressTween.start({ to: MAX_PROGRESS });
  loaders.add(loader);
}

/** Завершить этап прогресса или прогресс целиком. */
function finish(loader) {
  if (!loaders.size) return;

  if (loader === undefined) {
    loaders.clear();
  } else {
    loaders.delete(loader);
  }

  if (loaders.size === 0) {
    progressTween.getTween().kill();
    if (show.value) {
      progressTween.getTween().kill();
      finishTween.start({ to: 100 }).then(reset);
    }
  }
}

/** Завершить прогресс провалом. */
function fail() {
  failed.value = true;
  finish();
}
</script>

<style scoped>
/* _progress.css */
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background-color: var(--blue);
  transition: opacity 0.2s linear 0.2s;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: none;
}

.progress.failed {
  background-color: #db3851;
}
</style>
