import type { CollectionConfig, CollectionSlug } from 'payload';

export const Students: CollectionConfig = {
  slug: 'students',
  labels: {
    singular: '学生',
    plural: '学生',
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
      name: 'layer',
      type: 'radio',
      options: ['A', 'B', 'C', 'D'],
      required: true,
    },
    {
      name: 'recentBigExamClassRank',
      type: 'number',
      required: true,
    },
    {
      name: 'recentBigExamSchoolRank',
      type: 'number',
      required: true,
    },
    {
      // 最近一次大考成绩
      name: 'recentBigExamScore',
      type: 'number',
      required: true,
    },
    {
      // 班级
      // TODO: 班级需要从班级表中获取
      name: 'className',
      type: 'text',
      required: true,
    },
    {
      // 年级
      // TODO: 年级需要从年级表中获取
      name: 'gradeName',
      type: 'text',
      required: true,
    },
    {
      // 师傅, 是另一个学生
      name: 'master',
      required: false,
      type: 'relationship',
      // TODO: fix type
      // https://github.com/payloadcms/payload/discussions/8880
      relationTo: 'students' as CollectionSlug,
    },
  ],
};
