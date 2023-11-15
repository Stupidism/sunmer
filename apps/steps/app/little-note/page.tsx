'use client';
import NextImage from 'next/image';
import React, { ChangeEvent, useMemo, useState } from 'react';
import clsx from 'clsx';

export default function LittleNote() {
  const [imageElement, setImageElement] = useState<HTMLImageElement>();
  const [noteCount, setNoteCount] = useState(54);
  const [formColumns, setColumns] = useState<number>();
  const [solutionAreaPadding, setSolutionAreaPadding] = useState(160);
  const [rotate90, setRotate90] = useState(false);
  const columns = formColumns ?? (rotate90 ? 4 : 2);
  const problemSrc = imageElement?.src;

  const setImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = (event.target?.result ?? '') as string;

      image.onload = () => {
        setImageElement(image);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;
    setImage(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items ?? [];

    for (const item of Array.from(items)) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        if (blob) setImage(blob);
      }
    }
  };

  const ratio = imageElement?.height
    ? imageElement.width / imageElement.height
    : 0;

  const notes = useMemo(
    () => Array(noteCount).fill(problemSrc),
    [problemSrc, noteCount]
  );

  return (
    <div onPaste={handlePaste}>
      <div className="no-print flex space-x-4 p-4 flex-col">
        <div className="flex  space-x-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <div className="flex items-center space-x-2 hidden">
            <input
              type="checkbox"
              id="simpleCheckbox"
              checked={rotate90}
              onChange={(e) => setRotate90(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="simpleCheckbox" className="text-sm text-gray-700">
              旋转90度
            </label>
          </div>
        </div>
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
