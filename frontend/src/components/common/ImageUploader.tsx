import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  multiple?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  maxFiles = 5,
  accept = 'image/*',
  multiple = true,
}) => {
  const [preview, setPreview] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    if (fileArray.length + preview.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    // Create previews
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    onImagesSelected(fileArray);
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
    setPreview(prev => prev.filter((_, i) => i !== index));
  };

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
        <p className="text-sm text-gray-500 mt-1">Hỗ trợ JPG, PNG, GIF tối đa {maxFiles} ảnh</p>
      </div>

      {preview.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Ảnh đã chọn ({preview.length}/{maxFiles})</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {preview.map((src, idx) => (
              <div key={idx} className="relative group">
                <img src={src} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded" />
                <button
                  onClick={() => removePreview(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note for Cloudinary Integration */}
      <p className="text-xs text-gray-400 mt-3">
        💡 Note: Images will be uploaded to Cloudinary after form submission
      </p>
    </div>
  );
};
