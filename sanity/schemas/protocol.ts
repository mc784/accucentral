import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'protocol',
  title: 'Protocol',
  type: 'document',
  description: 'An acupressure service or treatment protocol offered by Chandan Accucenter',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'The name of the service (e.g., "Tech-Neck Relief Protocol", "Anxiety Management Session")',
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
      description: 'Short benefit-focused description (e.g., "Instant relief for desk workers", "Find calm in 15 minutes")',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Stress & Anxiety', value: 'stress-anxiety' },
          { title: 'Chronic Pain', value: 'chronic-pain' },
          { title: 'Sleep & Insomnia', value: 'sleep-insomnia' },
          { title: 'Digestive Health', value: 'digestive-health' },
          { title: 'Headaches & Migraines', value: 'headaches' },
          { title: 'Musculoskeletal', value: 'musculoskeletal' },
          { title: 'Women\'s Health', value: 'womens-health' },
          { title: 'Respiratory', value: 'respiratory' },
        ],
        layout: 'dropdown',
      },
      description: 'Primary symptom category this service addresses',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetIssue',
      title: 'Target Condition',
      type: 'string',
      description: 'Specific problem this service addresses (e.g., "Tech-neck from desk work", "Chronic tension headaches", "Insomnia")',
    }),
    defineField({
      name: 'duration',
      title: 'Session Duration',
      type: 'string',
      description: 'Length of the treatment session (e.g., "30 minutes", "45 minutes", "1 hour")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Condition Complexity',
      type: 'string',
      options: {
        list: [
          { title: 'Mild - Quick Relief', value: 'beginner' },
          { title: 'Moderate - Multi-session', value: 'intermediate' },
          { title: 'Chronic - Long-term Care', value: 'advanced' },
          { title: 'All Conditions', value: 'all-levels' },
        ],
        layout: 'radio',
      },
      description: 'Complexity of the condition being treated',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'frequency',
      title: 'Recommended Treatment Frequency',
      type: 'string',
      description: 'How often sessions are recommended (e.g., "1-2 sessions per week", "Weekly for 4 weeks", "Single session")',
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
      title: 'Service Description',
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
      description: 'Detailed description of what this service entails and why it works',
    }),
    defineField({
      name: 'poseSequence',
      title: 'Pressure Point Sequence',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'poseStep',
          title: 'Treatment Step',
          fields: [
            {
              name: 'pose',
              title: 'Pressure Point',
              type: 'reference',
              to: [{ type: 'yogaPose' }],
              description: 'Reference to an acupressure point (schema will be renamed later)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Treatment Duration',
              type: 'string',
              description: 'e.g., "2-3 minutes", "30 seconds", "1 minute per side"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'instructions',
              title: 'Treatment Instructions',
              type: 'text',
              description: 'Specific technique for this point (pressure type, angle, breathing)',
              rows: 3,
            },
            {
              name: 'transitionNote',
              title: 'Transition Note',
              type: 'string',
              description: 'How to move to the next point (e.g., "Release slowly", "Switch sides")',
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
                title: title || 'Untitled Point',
                subtitle: duration || 'No duration set',
              }
            },
          },
        },
      ],
      description: 'The ordered sequence of pressure points used in this treatment',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'benefits',
      title: 'Expected Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What results can clients expect from this service?',
      validation: (Rule) => Rule.min(3).max(8),
    }),
    defineField({
      name: 'scienceExplainer',
      title: 'The Science & Mechanism',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'Explain the scientific basis (e.g., "Gate Control Theory blocks pain signals", "TCM meridian theory")',
    }),
    defineField({
      name: 'bestPracticedWhen',
      title: 'Ideal For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Who benefits most or when to seek treatment (e.g., "Office workers with neck pain", "People with chronic insomnia")',
    }),
    defineField({
      name: 'contraindications',
      title: 'Contraindications & Precautions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Who should avoid this treatment or consult a doctor first (e.g., "Pregnancy", "Recent surgery", "Blood thinners")',
    }),
    defineField({
      name: 'tips',
      title: 'Treatment Tips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Expert advice for maximizing results (e.g., "Drink water after session", "Apply gentle pressure")',
    }),
    defineField({
      name: 'relatedProtocols',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'protocol' }] }],
      description: 'Similar or complementary services that clients might be interested in',
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
