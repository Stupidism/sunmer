import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { Input, Label } from '@sunmer/ui';

interface ImageUploaderProps {
  onImageUpload: (image: HTMLImageElement) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
}) => {
  const handleImage = useCallback(
    (file: File) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = (event.target?.result ?? '') as string;

        image.onload = () => {
          onImageUpload(image);
        };
      };

      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;
    handleImage(file);
  };

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items ?? [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (!blob) continue;
          handleImage(blob);
        }
      }
    },
    [handleImage]
  );

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
  }, [handlePaste]);

  return (
    <div className="flex space-x-4 items-center">
      <Label className="w-40" htmlFor="file">
        选择或粘贴图片
      </Label>
      <Input id="file" type="file" onChange={handleUpload} />
    </div>
  );
};
