import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'number',
      description: 'Number of days',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'targetProfile',
      title: 'Target Cortisol Profile',
      type: 'string',
      options: {
        list: [
          { title: 'All Profiles', value: 'all' },
          { title: 'The Spiker', value: 'spiker' },
          { title: 'The Flatliner', value: 'flatliner' },
          { title: 'The Night Owl', value: 'night-owl' },
        ],
      },
      description: 'Which cortisol profile this program is designed for',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'All Levels', value: 'all-levels' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'days',
      title: 'Days',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'day',
          fields: [
            {
              name: 'dayNumber',
              title: 'Day Number',
              type: 'number',
              validation: (Rule) => Rule.required().positive().integer(),
            },
            {
              name: 'theme',
              title: 'Theme',
              type: 'string',
              description: 'Theme for this day (e.g., "Grounding & Stability")',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'poses',
              title: 'Poses',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'yogaPose' }] }],
            },
          ],
          preview: {
            select: {
              dayNumber: 'dayNumber',
              theme: 'theme',
            },
            prepare({ dayNumber, theme }) {
              return {
                title: `Day ${dayNumber}`,
                subtitle: theme || 'No theme',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
      status: 'status',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, duration, status } = selection
      const statusEmoji = status === 'published' ? '✅' : '📝'
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${duration} days`,
        media: selection.media,
      }
    },
  },
})
