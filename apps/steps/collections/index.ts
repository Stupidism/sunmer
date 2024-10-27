import type { CollectionConfig } from 'payload';

import { Students } from './students';
import { Exams } from './exams';
import { ExamResults } from './exam-results';

export const collections = [
  Students,
  Exams,
  ExamResults,
] satisfies CollectionConfig[];
