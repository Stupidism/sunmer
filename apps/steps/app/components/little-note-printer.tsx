'use client';
import NextImage from 'next/image';
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';

import { Button } from '@sunmer/ui';

import { ImageUploader } from './image-uploader';

export function LittleNotesPrinter() {
  const [imageElement, setImageElement] = useState<HTMLImageElement>();

  const [noteCount, setNoteCount] = useState(54);
  const [formColumns, setColumns] = useState<number>();
  const [solutionAreaPadding, setSolutionAreaPadding] = useState(160);
  const [rotate90] = useState(false);
  const columns = formColumns ?? (rotate90 ? 4 : 2);
  const problemSrc = imageElement?.src;
  const hasProblem = !!problemSrc;

  const ratio = imageElement?.height
    ? imageElement.width / imageElement.height
    : 0;

  const notes = useMemo(
    () => Array(noteCount).fill(problemSrc),
    [problemSrc, noteCount]
  );

  return (
    <div>
      <div className="no-print flex space-y-4 p-4 flex-col">
        <div className="flex justify-between space-x-4">
          <span>小纸条打印机</span>
          {/* use tailwind css to center an element with position absolute

 */}
          <div
            className={clsx(
              'absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-1/2',
              {
                'top-1/3': !hasProblem,
              }
            )}
          >
            <ImageUploader onImageUpload={setImageElement} />
          </div>

          <Button
            className={clsx({ hidden: !hasProblem })}
            disabled={!hasProblem}
            onClick={() => {
              console.log('onClick: ');

              window.print();
            }}
          >
            {!hasProblem && '👈🏻 先选图片再'}打印
          </Button>
        </div>
        {hasProblem && (
          <div className="flex  space-x-4">
            <div className="flex flex-col w-1/3">
              <label
                htmlFor="firstName"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                列数
              </label>
              <input
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                type="text"
                id="firstName"
                className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label
                htmlFor="lastName"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                做题空间
              </label>
              <input
                value={solutionAreaPadding}
                onChange={(e) => setSolutionAreaPadding(Number(e.target.value))}
                type="text"
                id="lastName"
                className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label
                htmlFor="lastName"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                小纸条张数
              </label>
              <input
                value={noteCount}
                onChange={(e) => setNoteCount(Number(e.target.value))}
                type="text"
                id="lastName"
                className="border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={`grid`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {problemSrc &&
          imageElement &&
          notes.map((note, index) => (
            <div
              key={index}
              style={
                rotate90
                  ? { paddingLeft: solutionAreaPadding }
                  : { paddingBottom: solutionAreaPadding }
              }
              className={clsx('border border-black-600')}
            >
              <div
                className="inline-block overflow-hidden"
                style={{
                  width: '100%',
                  paddingBottom: rotate90 ? `${ratio * 100}%` : undefined,
                }}
              >
                <NextImage
                  src={problemSrc}
                  alt="Selected"
                  // className="rotate-90 origin-top-left relative top-full"
                  width={imageElement.width}
                  height={imageElement.height}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
