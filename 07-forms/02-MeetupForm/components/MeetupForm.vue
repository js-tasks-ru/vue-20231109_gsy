<template>
  <form class="meetup-form" @submit="submit">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput name="title" v-model="title" />
        </UiFormGroup>

        <UiFormGroup label="Дата">
          <UiInputDate name="date" type="date" v-model="date" />
        </UiFormGroup>

        <UiFormGroup label="Место">
          <UiInput name="place" v-model="place" />
        </UiFormGroup>

        <UiFormGroup label="Описание">
          <UiInput multiline rows="3" name="description" v-model="description" />
        </UiFormGroup>

        <UiFormGroup label="Изображение">
          <ui-image-uploader
            name="image"
            :preview="image"
            @select="selectImage"
            @remove="removeImage" />
        </UiFormGroup>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>

      <meetup-agenda-item-form
        class="meetup-form__agenda-item"
        v-for="itm, idx in agenda"
        :key="itm.id"
        v-model:agendaItem="agenda[idx]"
        @remove="() => removeAgendaItem(itm)" />


      <div class="meetup-form__append">
        <button class="meetup-form__append-button"
          type="button"
          data-test="addAgendaItem"
          @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <ui-button block
          class="meetup-form__aside-button"
          variant="secondary"
          data-test="cancel"
          @click="$emit('cancel')">
          Отмена
        </ui-button>

        <ui-button block
          class="meetup-form__aside-button"
          variant="primary"
          data-test="submit"
          type="submit"
          @click="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
  import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
  import UiButton from './UiButton.vue';
  import UiFormGroup from './UiFormGroup.vue';
  import UiInput from './UiInput.vue';
  // import UiInputDate from './UiInputDate.vue'; // Заменен.
  // import UiImageUploader from './UiImageUploader.vue'; // Заменен.
  import UiInputDate from '../../../06-wrappers/06-UiInputDate/components/UiInputDate.vue';
  import UiImageUploader from '../../../06-wrappers/05-UiImageUploader/components/UiImageUploader.vue';
  import { createAgendaItem } from '../meetupService.js';

  export default {
    name: 'MeetupForm',

    components: {
      MeetupAgendaItemForm,
      UiButton,
      UiFormGroup,
      UiImageUploader,
      UiInput,
      UiInputDate,
    },

    emits: [
      'submit',
      'cancel'
    ],

    props: {
      meetup: {
        type: Object,
        required: true,
      },

      submitText: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        date: this.meetup.date || null,
        title: this.meetup.title || '',
        place: this.meetup.place || '',
        image: this.meetup.image || '',
        // imageToUpload: null, // ломает тест (стр. 132).
        description: this.meetup.description || '',
        agenda: this.meetup?.agenda?.map(m => m) || [],
      };
    },

    methods: {
      submit(evt) {
        evt.preventDefault();
        this.$emit('submit', {
          ...this.meetup,
          ...this.$data,
          agenda: this.agenda.map(a => ({ ...a })),
        });
      },

      addAgendaItem() {
        let itm = createAgendaItem();
        let lng = this.agenda.length;
        let lst = lng && this.agenda[lng - 1];

        if (lst) itm.startsAt = lst.endsAt;
        this.agenda.push(itm);
      },

      updateAgendaItem(itm) {
        let old = this.agenda.find(a => a.id === itm.id);
        let idx = this.agenda.indexOf(old);
        if (~idx) this.agenda.splice(idx, 1, itm);
      },

      removeAgendaItem(itm) {
        let idx = this.agenda.indexOf(itm);
        if (~idx) this.agenda.splice(idx, 1);
      },

      selectImage(file) {
        this.image = '';
        this.imageToUpload = file;
      },

      removeImage() {
        this.image = '';
        this.imageToUpload = null;
      },
    },
  };
</script>

<style scoped>
  .meetup-form__section {
    border: none;
  }

  .meetup-form__agenda-title {
    font-weight: 700;
    font-size: 28px;
    line-height: 150%;
    color: var(--body-color);
    margin: 0 0 24px 0;
  }

  .meetup-form__aside {
    margin: 48px 0;
  }

  .meetup-form__aside-button {
    margin: 0 0 12px 0;
  }

  .meetup-form__agenda-item+.meetup-form__agenda-item {
    margin-top: 24px;
  }

  .meetup-form__append {
    margin-top: 24px;
  }

  .meetup-form__append-button {
    box-shadow: none;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
    color: var(--blue);
    cursor: pointer;
    font-size: 20px;
    line-height: 28px;
  }

  .meetup-form__append-button:hover {
    text-decoration: underline;
  }

  @media all and (min-width: 992px) {
    .meetup-form {
      display: flex;
      flex-direction: row;
    }

    .meetup-form__content {
      flex: 1 0 calc(100% - 320px);
    }

    .meetup-form__aside {
      flex: 1 0 320px;
      max-width: 320px;
      width: 100%;
      padding-left: 137px;
      margin: 0;
    }

    .meetup-form__aside-stick {
      position: sticky;
      top: 32px;
    }
  }
</style>
