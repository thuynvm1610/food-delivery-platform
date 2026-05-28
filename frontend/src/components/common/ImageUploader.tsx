import React, { useEffect, useRef, useState } from 'react';

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
    onImagesSelected(nextItems.map(item => item.file));
  };

  const handleFiles = (filesList: FileList) => {
    const fileArray = Array.from(filesList);
    const remainingSlots = maxFiles - itemsRef.current.length;

    if (fileArray.length > remainingSlots) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const nextItems = [
      ...itemsRef.current,
      ...fileArray.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ];

    setItems(nextItems);
    syncFiles(nextItems);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removePreview = (index: number) => {
    setItems(prevItems => {
      const itemToRemove = prevItems[index];
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }

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
      itemsRef.current.forEach(item => URL.revokeObjectURL(item.previewUrl));
    };
  }, []);

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400'
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
        <p className="text-gray-700 font-semibold">Kéo thả ảnh hoặc nhấp để chọn</p>
        <p className="text-sm text-gray-500 mt-1">Hỗ trợ JPG, PNG, GIF, tối đa {maxFiles} ảnh</p>
      </div>

      {items.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Ảnh đã chọn ({items.length}/{maxFiles})</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, idx) => (
              <div key={`${item.file.name}-${item.file.lastModified}-${idx}`} className="relative group">
                <img src={item.previewUrl} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removePreview(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-3">Ảnh sẽ được tải lên sau khi lưu món.</p>
    </div>
  );
};
