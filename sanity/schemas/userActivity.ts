import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'userActivity',
  title: 'User Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'userProfile' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pose',
      title: 'Pose',
      type: 'reference',
      to: [{ type: 'yogaPose' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'poseCategory',
      title: 'Pose Category',
      type: 'string',
      description: 'Cached category for calculating regulation metrics',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      userEmail: 'user.email',
      poseTitle: 'pose.title',
      duration: 'duration',
    },
    prepare(selection) {
      const { userEmail, poseTitle, duration } = selection
      return {
        title: poseTitle || 'Unknown pose',
        subtitle: `${userEmail} • ${duration} min`,
      }
    },
  },
})
