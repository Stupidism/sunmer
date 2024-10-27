import type { CollectionConfig, CollectionSlug } from 'payload';
import { Exams } from './exams';

export const ExamResults: CollectionConfig = {
  slug: 'exam-results',
  labels: {
    singular: '考试成绩',
    plural: '考试成绩',
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students' as CollectionSlug,
    },
    {
      name: 'exam',
      type: 'relationship',
      relationTo: 'exams' as CollectionSlug,
    },
    ...Exams.fields.filter(
      (field) => 'name' in field && field.name.endsWith('Score')
    ),
  ],
};
