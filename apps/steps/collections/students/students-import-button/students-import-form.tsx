'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Input } from '@sunmer/ui/components/ui/input';
import { Label } from '@sunmer/ui/components/ui/label';

import { parseColumnFromCsv, formSchema } from './students-import-form.const';
import { toast } from 'sonner';

interface StudentsImportFormProps {
  onStudentsUploaded: (
    students: {
      className: string;
      name: string;
    }[]
  ) => void;
}

export const StudentsImportForm = (props: StudentsImportFormProps) => {
  const { onStudentsUploaded } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '七年五班',
      studentNameColumnName: '姓名',
    },
  });
  const errors = form.formState.errors;

  const onSubmit = async (formValues: {
    className: string;
    studentsCsv: FileList;
    studentNameColumnName?: string;
  }) => {
    if (isSubmitting) {
      return;
    }
    const { className, studentsCsv, studentNameColumnName } = formValues;
    setIsSubmitting(true);
    const { targetColumnIndex, targetColumnValues: studentNames } =
      await parseColumnFromCsv(studentsCsv[0], studentNameColumnName);

    if (targetColumnIndex === -1) {
      toast.error('导入失败!');
      form.setError('studentNameColumnName', {
        message: `未找到学生姓名列!指定列名为: ${studentNameColumnName}`,
      });
      setIsSubmitting(false);
      return;
    }
    onStudentsUploaded(
      studentNames.map((studentName) => ({
        className,
        name: studentName,
      }))
    );
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      id="students-import-form"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="className">班级名称</Label>
        <Input
          defaultValue="七年五班"
          required
          {...form.register('className', {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="studentsCsv">班级名单 csv</Label>
        <Input
          type="file"
          accept=".csv"
          required
          {...form.register('studentsCsv', {
            required: true,
          })}
        />
        <p className="text-sm text-gray-500">
          如果 csv 文件中包含其他列，请在下一个输入框中指定列名
        </p>
        {errors.studentsCsv && (
          <p className="text-red-500">{errors.studentsCsv.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="studentNameColumnName">学生姓名列名</Label>
        <Input
          defaultValue="姓名"
          {...form.register('studentNameColumnName')}
        />
        {errors.studentNameColumnName && (
          <p className="text-red-500">{errors.studentNameColumnName.message}</p>
        )}
      </div>
    </form>
  );
};
