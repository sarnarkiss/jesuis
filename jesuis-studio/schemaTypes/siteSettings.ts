import {defineType, defineField} from 'sanity'

const PROJECT_STATUS_OPTIONS = [
  {title: 'Скоро (кнопка «Скоро»)', value: 'soon'},
  {title: 'Открыт (кнопка «Перейти в Telegram»)', value: 'open'},
]

export default defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',

  groups: [
    {name: 'project', title: 'Проект «Я есть»', default: true},
    {name: 'photos', title: 'Фото'},
    {name: 'contacts', title: 'Контакты'},
    {name: 'media', title: 'Видео'},
  ],

  fields: [
    defineField({
      name: 'mainProjectStatus',
      title: 'Статус проекта «Я есть — жизнь после 50»',
      type: 'string',
      group: 'project',
      options: {list: PROJECT_STATUS_OPTIONS, layout: 'radio'},
      initialValue: 'soon',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'mainProjectUrl',
      title: 'Ссылка для кнопки «Перейти в Telegram»',
      type: 'url',
      group: 'project',
    }),

    defineField({
      name: 'heroPhoto',
      title: 'Фото на главной (первый экран)',
      type: 'image',
      group: 'photos',
      options: {hotspot: true},
      description:
        'Вертикальное фото, лучше 1600×2000 и больше. Нажмите на кружок в фото, чтобы отметить лицо — при обрезке на телефоне оно останется в кадре.',
    }),

    defineField({
      name: 'aboutPhoto',
      title: 'Фото на странице «Обо мне» (необязательно)',
      type: 'image',
      group: 'photos',
      options: {hotspot: true},
      description: 'Если пусто — используется фото с главной.',
    }),

    defineField({
      name: 'telegramUrl',
      title: 'Telegram (кнопка «Написать мне»)',
      type: 'url',
      group: 'contacts',
    }),

    defineField({name: 'instagramUrl', title: 'Instagram', type: 'url', group: 'contacts'}),
    defineField({name: 'youtubeUrl', title: 'YouTube', type: 'url', group: 'contacts'}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'contacts'}),

    defineField({
      name: 'introVideoUrl',
      title: 'Видео-знакомство (ссылка YouTube / Vimeo)',
      type: 'url',
      group: 'media',
    }),

    defineField({
      name: 'introVideoFile',
      title: 'Видео-знакомство: файл (необязательно)',
      type: 'file',
      group: 'media',
      options: {accept: 'video/mp4,video/webm'},
      description:
        'Если файл загружен, на сайте показывается он в собственном плеере, а ссылка выше не используется. Только MP4, лучше до 50 МБ.',
    }),

    defineField({
      name: 'introVideoPoster',
      title: 'Заставка видео-файла',
      type: 'image',
      group: 'media',
      hidden: ({document}) => !(document as any)?.introVideoFile?.asset,
      description: 'Кадр, который виден до нажатия Play. Обычно первый кадр видео.',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Настройки сайта'}),
  },
})
