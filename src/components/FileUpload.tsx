
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value?: string | null;
  className?: string;
  accept?: string;
  label?: string;
  previewSize?: "sm" | "md" | "lg";
}

const FileUpload = ({
  onChange,
  value,
  className,
  accept = "image/*",
  label = "Upload Image",
  previewSize = "md",
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sizeClasses = {
    sm: "h-24 w-24",
    md: "h-40 w-40",
    lg: "h-56 w-56",
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
      
      <div 
        className={cn(
          "relative bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden",
          sizeClasses[previewSize]
        )}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1 right-1 p-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-center p-4">
            <Upload className="h-8 w-8 mx-auto mb-2" />
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        className="w-full"
      >
        {label}
      </Button>
    </div>
  );
};

export default FileUpload;
