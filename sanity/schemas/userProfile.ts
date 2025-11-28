import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'userProfile',
  title: 'User Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'cortisolProfile',
      title: 'Cortisol Profile',
      type: 'string',
      options: {
        list: [
          { title: 'The Spiker', value: 'spiker' },
          { title: 'The Flatliner', value: 'flatliner' },
          { title: 'The Night Owl', value: 'night-owl' },
        ],
      },
    }),
    defineField({
      name: 'quizResults',
      title: 'Quiz Results',
      type: 'object',
      fields: [
        { name: 'score', type: 'number' },
        { name: 'answers', type: 'array', of: [{ type: 'string' }] },
        { name: 'completedAt', type: 'datetime' },
      ],
    }),
    defineField({
      name: 'regulationMinutes',
      title: 'Total Regulation Minutes',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      profile: 'cortisolProfile',
    },
    prepare(selection) {
      const { email, profile } = selection
      return {
        title: email,
        subtitle: profile || 'No profile assigned',
      }
    },
  },
})
