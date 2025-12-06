import { useState, useCallback, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CameraCapture } from '@/components/CameraCapture';

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  isLoading?: boolean;
}

export const ImageUpload = ({ onImageSelect, isLoading }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    console.log('handleFile called with:', file.name, file.type);
    if (!file.type.startsWith('image/')) {
      console.log('Not an image, skipping');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      console.log('File read as base64, length:', base64.length);
      setPreview(base64);
      console.log('Calling onImageSelect with base64');
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('handleInputChange - file selected:', file?.name);
    if (file) handleFile(file);
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const openFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = useCallback((base64: string) => {
    console.log('Camera capture - base64 length:', base64.length);
    setPreview(base64);
    console.log('Calling onImageSelect from camera');
    onImageSelect(base64);
  }, [onImageSelect]);

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative flex flex-col items-center justify-center w-full py-12 px-6",
            "bg-card/50 backdrop-blur-sm rounded-2xl transition-all duration-300",
            "border border-border/50",
            isDragging 
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
              : "hover:border-primary/30 hover:bg-card/70",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          <div className={cn(
            "flex flex-col items-center gap-6 transition-transform duration-300",
            isDragging && "scale-105"
          )}>
            <div className={cn(
              "p-5 rounded-2xl bg-secondary/80",
              isDragging && "bg-primary/20"
            )}>
              <Upload className={cn(
                "w-10 h-10 transition-colors",
                isDragging ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {isDragging ? "Drop your image here" : "Upload Math Problem"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag & drop an image or use the options below
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={openFileUpload}
                className="flex-1 sm:flex-none border-border/50 hover:bg-secondary/80"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
              <Button 
                onClick={() => setIsCameraOpen(true)}
                className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Supports PNG, JPG, WEBP
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50">
          <img 
            src={preview} 
            alt="Uploaded math problem" 
            className="w-full h-72 object-contain bg-secondary/30 p-4"
          />
          
          {!isLoading && (
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-background/90 hover:bg-destructive/20 hover:text-destructive transition-all border border-border/50"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
                <p className="text-sm font-medium text-primary">Analyzing problem...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};