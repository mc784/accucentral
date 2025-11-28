import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'yogaPose',
  title: 'Yoga Pose',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The common name of the yoga pose (e.g., "Cobra Pose")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sanskritName',
      title: 'Sanskrit Name',
      type: 'string',
      description: 'The Sanskrit name (e.g., "Bhujangasana")',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Standing Poses', value: 'standing' },
          { title: 'Seated Poses', value: 'seated' },
          { title: 'Backbends', value: 'backbends' },
          { title: 'Forward Bends', value: 'forward-bends' },
          { title: 'Twists', value: 'twists' },
          { title: 'Inversions', value: 'inversions' },
          { title: 'Arm Balances', value: 'arm-balances' },
          { title: 'Hip Openers', value: 'hip-openers' },
          { title: 'Core Strength', value: 'core' },
          { title: 'Restorative', value: 'restorative' },
          { title: 'Balancing', value: 'balancing' },
        ],
      },
      description: 'Primary category of the pose',
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
        ],
        layout: 'radio',
      },
      description: 'Skill level required',
    }),
    defineField({
      name: 'duration',
      title: 'Suggested Duration',
      type: 'string',
      description: 'e.g., "5-10 breaths" or "1-3 minutes"',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key benefits (e.g., "Strengthens legs", "Opens hips")',
    }),
    defineField({
      name: 'contraindications',
      title: 'Contraindications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cautions and who should avoid this pose',
    }),
    defineField({
      name: 'musclesWorked',
      title: 'Muscles Worked',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Primary muscle groups engaged',
    }),
    defineField({
      name: 'relatedPoses',
      title: 'Related Poses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'yogaPose' }] }],
      description: 'Similar or complementary poses',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'AI-generated technical diagram or photo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      description: 'The main content of the pose guide',
    }),
    defineField({
      name: 'sosIntervention',
      title: 'SOS Intervention',
      type: 'boolean',
      description: 'Is this a short intervention sequence for acute stress relief (<10 mins)?',
      initialValue: false,
    }),
    defineField({
      name: 'interventionType',
      title: 'Intervention Type',
      type: 'string',
      options: {
        list: [
          { title: 'Morning Flush', value: 'morning-flush' },
          { title: '3 PM Rescue', value: '3pm-rescue' },
          { title: 'Optical Anchor', value: 'optical-anchor' },
          { title: 'Evening Wind-Down', value: 'evening-wind-down' },
        ],
      },
      description: 'Type of SOS intervention (only if sosIntervention is true)',
      hidden: ({ parent }) => !parent?.sosIntervention,
    }),
    defineField({
      name: 'regulationType',
      title: 'Regulation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Restorative (Calming)', value: 'restorative' },
          { title: 'Power (Energizing)', value: 'power' },
          { title: 'Balanced', value: 'balanced' },
        ],
        layout: 'radio',
      },
      description: 'How this pose affects the nervous system',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Generated (Review Needed)', value: 'generated' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'generated',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aiMetadata',
      title: 'AI Generation Metadata',
      type: 'object',
      description: 'Information about AI generation',
      fields: [
        {
          name: 'model',
          title: 'Model Used',
          type: 'string',
          description: 'Which AI model generated this content',
        },
        {
          name: 'generationId',
          title: 'Generation ID',
          type: 'string',
          description: 'Step Function execution ID',
        },
        {
          name: 'generatedAt',
          title: 'Generated At',
          type: 'datetime',
          description: 'When the content was generated',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sanskritName',
      media: 'mainImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection
      const statusEmoji = status === 'published' ? '✅' : '🔍'
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: subtitle || 'No Sanskrit name',
        media: selection.media,
      }
    },
  },
})
