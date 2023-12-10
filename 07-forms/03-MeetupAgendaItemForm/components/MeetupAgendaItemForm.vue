<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" name="type"
        v-model="localItem.type"
        :options="$options.agendaItemTypeOptions" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput name="startsAt" type="time"
            placeholder="00:00"
            v-model="localItem.startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput name="endsAt" type="time"
            placeholder="00:00"
            v-model="localItem.endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup :label="titleLabel">
      <UiInput name="title" v-model="localItem.title" />
    </UiFormGroup>

    <UiFormGroup label="Докладчик" v-if="fieldVisible.speaker">
      <UiInput name="speaker" v-model="localItem.speaker" />
    </UiFormGroup>

    <UiFormGroup label="Описание" v-if="fieldVisible.description">
      <UiInput multiline name="description"
        v-model="localItem.description" />
    </UiFormGroup>

    <UiFormGroup label="Язык" v-if="fieldVisible.language">
      <UiDropdown name="language" title="Язык"
        v-model="localItem.language"
        :options="$options.talkLanguageOptions" />
    </UiFormGroup>
  </fieldset>
</template>

<script>
  import UiIcon from './UiIcon.vue';
  import UiFormGroup from './UiFormGroup.vue';
  import UiInput from './UiInput.vue';
  import UiDropdown from './UiDropdown.vue';

  const agendaItemTypeIcons = {
    registration: 'key',
    opening: 'cal-sm',
    talk: 'tv',
    break: 'clock',
    coffee: 'coffee',
    closing: 'key',
    afterparty: 'cal-sm',
    other: 'cal-sm',
  };

  const agendaItemDefaultTitles = {
    registration: 'Регистрация',
    opening: 'Открытие',
    break: 'Перерыв',
    coffee: 'Coffee Break',
    closing: 'Закрытие',
    afterparty: 'Afterparty',
    talk: 'Доклад',
    other: 'Другое',
  };

  const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
    value: type,
    text: title,
    icon: agendaItemTypeIcons[type],
  }));

  const talkLanguageOptions = [
    { value: null, text: 'Не указано' },
    { value: 'RU', text: 'RU' },
    { value: 'EN', text: 'EN' },
  ];

  export default {
    name: 'MeetupAgendaItemForm',

    agendaItemTypeOptions,
    talkLanguageOptions,

    components: {
      UiIcon,
      UiFormGroup,
      UiInput,
      UiDropdown
    },

    emits: [
      'remove',
      'update:agendaItem'
    ],

    props: {
      agendaItem: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        localItem: {
          type: 'other',
          title: '',
          description: '',
          startsAt: '00:00',
          endsAt: '00:00',
          speaker: '',
          language: null,
          ...this.agendaItem,
        },

        duration: this.couputeDuration(
          this.agendaItem.startsAt,
          this.agendaItem.endsAt
        ),
      };
    },

    computed: {
      fieldVisible() {
        let type = this.localItem.type;
        return {
          speaker: ['talk'].includes(type),
          language: ['talk'].includes(type),
          description: ['talk', 'other'].includes(type),
        };
      },

      titleLabel() {
        switch (this.localItem.type) {
          case 'talk': return 'Тема';
          case 'other': return 'Заголовок';
          default: return 'Нестандартный текст (необязательно)';
        }
      },
    },

    watch: {
      localItem: {
        deep: true,
        handler() {
          this.$emit('update:agendaItem', {
            ...this.agendaItem,
            ...this.localItem,
          });
        },
      },

      'localItem.startsAt'() {
        let stt = this.parseTime(this.localItem.startsAt);
        let end = stt + this.duration;
        this.localItem.endsAt = this.formatTime(end);
      },

      'localItem.endsAt'() {
        this.duration = this.couputeDuration(
          this.localItem.startsAt,
          this.localItem.endsAt
        );
      },
    },

    methods: {
      parseTime(time /* 'hh:mm' */) {
        let [hh, mm] = time.split(':');
        hh = parseInt(hh) * 60;
        mm = parseInt(mm);
        return hh + mm;
      },

      formatTime(time /* minutes */) {
        let hh = Math.floor(time / 60) % 24;
        let mm = time % 60;
        hh = hh > 9 ? hh : '0' + hh;
        mm = mm > 9 ? mm : '0' + mm;
        return `${hh}:${mm}`;
      },

      couputeDuration(start, finish) {
        let stt = typeof start === 'number' ? start : this.parseTime(start);
        let end = typeof finish === 'number' ? finish : this.parseTime(finish);
        let max = 1440; // = 24 * 60; // minutes in one day.
        return (max + end - stt) % max;
      },
    },
  };
</script>

<style scoped>
  .agenda-item-form {
    border: 2px solid var(--blue-light);
    border-radius: 8px;
    position: relative;
    padding: 20px 10% 0 16px;
  }

  .agenda-item-form__remove-button {
    position: absolute;
    top: 4px;
    right: 0;
    box-shadow: none;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 4px;
    cursor: pointer;
    transition: 0.2s opacity;
  }

  .agenda-item-form__remove-button:hover {
    opacity: 0.6;
  }

  .agenda-item-form__row {
    display: flex;
    flex-direction: column;
  }

  .agenda-item-form__col+.agenda-item-form__col {
    margin-top: 16px;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }

  @media all and (min-width: 992px) {
    .agenda-item-form {
      padding: 28px 25% 4px 24px;
    }

    .agenda-item-form__remove-button {
      top: 20px;
      right: 20px;
    }

    .agenda-item-form__row {
      flex-direction: row;
      justify-content: space-between;
      margin: 0 -12px;
    }

    .agenda-item-form__col {
      flex: 1 1 auto;
      padding: 0 12px;
    }

    .agenda-item-form__col+.agenda-item-form__col {
      margin-top: 0;
    }

    .agenda-item-form__col:first-child {
      margin-left: 0;
    }
  }
</style>
