'use client';
import { z } from 'zod';

export const formSchema = z.object({
  className: z.string().min(1),
  studentsCsv: z.unknown().transform((value) => {
    return value as FileList;
  }),
  studentNameColumnName: z.string().optional(),
});

export const parseColumnFromCsv = async (
  file: File,
  targetColumnName?: string
) => {
  const text = await file.text();
  const rows = text.split(/[\r\n]+/);
  const targetColumnIndex = targetColumnName
    ? rows[0].indexOf(targetColumnName)
    : 0;

  return {
    rows,
    targetColumnIndex,
    targetColumnValues: rows
      .map((row) => row.split(',')[targetColumnIndex])
      .filter((row) => row)
      .slice(targetColumnName ? 1 : 0),
  };
};
