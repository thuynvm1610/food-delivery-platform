import React, { useEffect, useRef, useState } from 'react';
import { notifyError } from '../../utils/notify';
import { ImageUp, FolderOpen } from 'lucide-react';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  multiple?: boolean;
}

type SelectedImage = {
  file: File;
  previewUrl: string;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  maxFiles = 5,
  accept = 'image/*',
  multiple = true,
}) => {
  const [items, setItems] = useState<SelectedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<SelectedImage[]>([]);

  const syncFiles = (nextItems: SelectedImage[]) => {
    onImagesSelected(nextItems.map((item) => item.file));
  };

  const handleFiles = (filesList: FileList) => {
    const fileArray = Array.from(filesList);
    const remainingSlots = maxFiles - itemsRef.current.length;

    if (fileArray.length > remainingSlots) {
      void notifyError(`Chỉ có thể tải lên tối đa ${maxFiles} ảnh`);
      return;
    }

    const nextItems = [
      ...itemsRef.current,
      ...fileArray.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ];

    setItems(nextItems);
    syncFiles(nextItems);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const removePreview = (index: number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems[index];
      if (itemToRemove) URL.revokeObjectURL(itemToRemove.previewUrl);
      const nextItems = prevItems.filter((_, i) => i !== index);
      syncFiles(nextItems);
      return nextItems;
    });
  };

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, []);

  const usedSlots = items.length;
  const progress = (usedSlots / maxFiles) * 100;

  return (
    <div className="w-full space-y-4 font-sans">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer overflow-hidden rounded-3xl border-2 p-10 text-center transition-all duration-200 ${dragActive ? 'border-orange-500 bg-orange-50' : 'border-slate-300 bg-slate-50'
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        {dragActive && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,113,113,0.12),transparent_70%)]" />
        )}

        <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 ${dragActive
            ? 'bg-blue-100 text-blue-500 scale-110'
            : 'bg-slate-100 text-slate-400'
          }`}>
          {dragActive
            ? <FolderOpen className="h-7 w-7" strokeWidth={1.5} />
            : <ImageUp className="h-7 w-7" strokeWidth={1.5} />
          }
        </div>

        <p className="text-base font-semibold text-slate-900">
          {dragActive ? 'Thả ảnh vào đây...' : 'Kéo thả hoặc nhấp để chọn ảnh'}
        </p>
        <p className="text-sm text-slate-500">JPG, PNG, GIF · Tối đa {maxFiles} ảnh</p>
      </div>

      {usedSlots > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>Ảnh đã chọn</span>
            <span className="text-slate-500">{usedSlots} / {maxFiles}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, idx) => (
            <div
              key={`${item.file.name}-${item.file.lastModified}-${idx}`}
              className="group relative overflow-visible rounded-3xl bg-slate-100"
            >
              <img src={item.previewUrl} alt={`Preview ${idx}`} className="h-full w-full object-cover rounded-3xl" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePreview(idx);
                }}
                className="cursor-pointer absolute -left-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg transition duration-200 hover:scale-110"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};