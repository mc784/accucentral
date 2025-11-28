import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'protocol',
  title: 'Protocol',
  type: 'document',
  description: 'A curated sequence of poses designed to address a specific health issue or goal',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the protocol (e.g., "7-Day Cortisol Detox")',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short one-liner (e.g., "Calm your nervous system in 10 minutes")',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Stress & Anxiety', value: 'stress-anxiety' },
          { title: 'Pain Relief', value: 'pain-relief' },
          { title: 'Energy & Vitality', value: 'energy' },
          { title: 'Sleep & Restoration', value: 'sleep' },
          { title: 'Flexibility & Mobility', value: 'flexibility' },
          { title: 'Strength & Stability', value: 'strength' },
          { title: 'Digestive Health', value: 'digestion' },
          { title: 'Posture Correction', value: 'posture' },
        ],
        layout: 'dropdown',
      },
      description: 'Primary health category this protocol addresses',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetIssue',
      title: 'Target Issue',
      type: 'string',
      description: 'Specific problem this solves (e.g., "Lower back pain", "Chronic stress", "Desk posture")',
    }),
    defineField({
      name: 'duration',
      title: 'Total Duration',
      type: 'string',
      description: 'How long the protocol takes (e.g., "10 minutes", "5-7 minutes")',
      validation: (Rule) => Rule.required(),
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
        layout: 'radio',
      },
      description: 'Skill level required',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'frequency',
      title: 'Recommended Frequency',
      type: 'string',
      description: 'How often to practice (e.g., "Daily for 7 days", "2-3x per week", "Every morning")',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Visual for the protocol card',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
      ],
      description: 'Explain the "why" - the science and context behind this protocol',
    }),
    defineField({
      name: 'poseSequence',
      title: 'Pose Sequence',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'poseStep',
          title: 'Pose Step',
          fields: [
            {
              name: 'pose',
              title: 'Pose',
              type: 'reference',
              to: [{ type: 'yogaPose' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., "5 breaths", "1 minute", "30 seconds"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'instructions',
              title: 'Specific Instructions',
              type: 'text',
              description: 'Any modifications or focus points for this pose in this protocol',
              rows: 3,
            },
            {
              name: 'transitionNote',
              title: 'Transition Note',
              type: 'string',
              description: 'How to move to the next pose (e.g., "Inhale to rise")',
            },
          ],
          preview: {
            select: {
              title: 'pose.title',
              duration: 'duration',
            },
            prepare(selection) {
              const { title, duration } = selection
              return {
                title: title || 'Untitled Pose',
                subtitle: duration || 'No duration set',
              }
            },
          },
        },
      ],
      description: 'The ordered sequence of poses in this protocol',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What will users gain from this protocol?',
      validation: (Rule) => Rule.min(3).max(8),
    }),
    defineField({
      name: 'scienceExplainer',
      title: 'The Science',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'Explain the physiological mechanism (e.g., "Vagal nerve stimulation reduces cortisol...")',
    }),
    defineField({
      name: 'bestPracticedWhen',
      title: 'Best Practiced When',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optimal times/situations (e.g., "Before bed", "After work", "When feeling anxious")',
    }),
    defineField({
      name: 'contraindications',
      title: 'Contraindications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Who should avoid this protocol or consult a doctor first',
    }),
    defineField({
      name: 'tips',
      title: 'Pro Tips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Expert advice to maximize effectiveness',
    }),
    defineField({
      name: 'relatedProtocols',
      title: 'Related Protocols',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'protocol' }] }],
      description: 'Similar or complementary protocols',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Featured', value: 'featured' },
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
      subtitle: 'tagline',
      media: 'coverImage',
      status: 'status',
      category: 'category',
    },
    prepare(selection) {
      const { title, subtitle, status, category } = selection
      const statusEmoji = status === 'published' ? '✅' : status === 'featured' ? '⭐' : '📝'
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: subtitle || category || 'No tagline',
        media: selection.media,
      }
    },
  },
})
