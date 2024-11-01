'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceBy } from 'lodash-es';

import { Button } from '@sunmer/ui/components/ui/button';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@sunmer/ui/components/ui/dialog';

import type {
  Student,
  DocCreateResponse,
  StudentToCreate,
} from '@steps/payload-types';

import { StudentsImportForm } from './students-import-form';

export default function StudentsBulkImportButton() {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const retryCountRef = useRef(0);

  const { mutateAsync: createStudent } = useMutation({
    mutationFn: (payload: {
      name: string;
      className: string;
    }): Promise<DocCreateResponse<Student>> =>
      fetch('/api/students', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json()),
  });

  const createStudents = async (newStudents: StudentToCreate[]) => {
    if (isCreating) {
      return;
    }
    console.log('🚀 ~ createStudents ~ retryCount:', retryCountRef.current);

    setIsCreating(true);
    const uploadedStudents: Student[] = [];
    await Promise.all(
      newStudents.map((student) =>
        createStudent(student).then((updatedStudent) => {
          uploadedStudents.push(updatedStudent.doc);
        })
      )
    ).finally(() => {
      setIsCreating(false);
      const leftStudents = differenceBy(newStudents, uploadedStudents, 'name');
      if (leftStudents.length > 0) {
        if (retryCountRef.current >= 3) {
          toast.error('导入失败，请稍后再试!');
          return;
        }
        setTimeout(
          () => createStudents(leftStudents),
          1000 * Math.pow(2, retryCountRef.current)
        );
        retryCountRef.current += 1;
      } else {
        toast.success('导入成功!');
        window.location.reload();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">导入学生</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] -translate-y-2/3">
        <DialogHeader>
          <DialogTitle>导入学生</DialogTitle>
          <DialogDescription>
            请尽可能构造一个只包含名字的班级名单 csv 文件
          </DialogDescription>
        </DialogHeader>
        <StudentsImportForm
          onStudentsUploaded={async (students) => {
            retryCountRef.current = 0;
            await createStudents(students);
            setOpen(false);
          }}
        />
        <DialogFooter>
          <Button
            type="submit"
            form="students-import-form"
            // disabled={isCreating}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
