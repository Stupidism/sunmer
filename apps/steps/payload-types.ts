import type { Student } from './generated-payload-types';

export type * from './generated-payload-types';

export type DocToCreate<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export interface DocCreateResponse<T> {
  message: string;
  doc: T;
}

export type StudentToCreate = Omit<DocToCreate<Student>, 'namePlusClassName'>;
