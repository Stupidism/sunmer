import type { CollectionConfig } from 'payload';

export const Exams: CollectionConfig = {
  slug: 'exams',
  labels: {
    singular: '考试',
    plural: '考试',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['月考', '期中', '期末', '周测'],
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      // 总分
      name: 'totalScore',
      type: 'number',
      required: true,
      defaultValue: 100,
    },
    {
      // 客观题总分
      name: 'objectiveTotalScore',
      type: 'number',
      required: true,
      defaultValue: 36,
    },
    {
      // 主观题总分
      name: 'subjectiveTotalScore',
      type: 'number',
      required: true,
      defaultValue: 64,
    },
    {
      // 填空题总分
      name: 'fillBlankTotalScore',
      type: 'number',
      required: true,
      defaultValue: 12,
    },
    {
      // 选择题总分
      name: 'choiceTotalScore',
      type: 'number',
      required: true,
      defaultValue: 24,
    },
    {
      // 解答题总分
      name: 'answerTotalScore',
      type: 'number',
      required: true,
      defaultValue: 64,
    },
    {
      // 计算题总分
      name: 'calculationTotalScore',
      type: 'number',
      required: true,
      defaultValue: 20,
    },
    {
      name: 'question1Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question2Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question3Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question4Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question5Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question6Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question7Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question8Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question9Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question10Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question11Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question12Score',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'question13Score',
      type: 'number',
      defaultValue: 10,
    },
    {
      name: 'question14Score',
      type: 'number',
      defaultValue: 10,
    },
    {
      name: 'question15Score',
      type: 'number',
      defaultValue: 8,
    },
    {
      name: 'question16Score',
      type: 'number',
      defaultValue: 8,
    },
    {
      name: 'question17Score',
      type: 'number',
      defaultValue: 8,
    },
    {
      name: 'question18Score',
      type: 'number',
      defaultValue: 8,
    },
    {
      name: 'question19Score',
      type: 'number',
      defaultValue: 8,
    },
    {
      name: 'question20Score',
      type: 'number',
      defaultValue: 8,
    },
  ],
};
