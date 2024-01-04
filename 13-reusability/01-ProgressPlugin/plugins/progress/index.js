import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

/** Используйте эту константу в качестве ключа provide/inject. */
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

/** Функция для удобного внедрения с Composition API. */
export function useProgress() {
  return inject(PROGRESS_KEY);
}

/**
 * Создать новый плагин с прогресс-баром.
 * @param {Object} opt           Объект с параметрами.
 * @param {Router} opt.router    Маршрутизатор приложения.
 * @param {string} opt.container Контейнер для размещения прогресс-бара.
 * @returns {Object} Плагин.
 */
export function createProgress({ container, router } = {}) {
  const cont = container ?? createContainer();
  const prog = createApp(TheTopProgressBar).mount(cont);

  const plug = {
    fail: prog.fail.bind(prog),
    start: prog.start.bind(prog),
    finish: prog.finish.bind(prog),
    install: (app) => app.provide(PROGRESS_KEY, plug),
  };

  if (router) {
    router.onError(() => prog.fail());
    router.afterEach(() => prog.finish());
    router.beforeEach(() => prog.start());
  }

  return plug;
}

/** Создать контейнер 'div' для прогресс-бара. */
function createContainer() {
  const elem = document.createElement('div');
  const place = document.body;
  return place.appendChild(elem);
}
