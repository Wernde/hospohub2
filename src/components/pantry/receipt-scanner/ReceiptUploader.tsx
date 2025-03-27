
import React, { useState, useRef } from 'react';
import { UploadCloud, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReceiptUploaderProps {
  onUpload: (imageData: string) => void;
}

const ReceiptUploader: React.FC<ReceiptUploaderProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraStream(stream);
      setCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        onUpload(imageData);
        stopCamera();
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!cameraActive ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 w-full flex flex-col items-center justify-center min-h-[200px] cursor-pointer ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground text-center mb-2">
            Drag and drop your receipt image, or click to browse
          </p>
          <p className="text-xs text-muted-foreground/70 text-center">
            Supports JPG, PNG and PDF
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFileInput}
          />
        </div>
      ) : (
        <div className="relative w-full">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full rounded-lg border"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button 
              variant="default" 
              className="rounded-full h-14 w-14 p-0 shadow-lg"
              onClick={captureImage}
            >
              <span className="sr-only">Capture photo</span>
              <div className="h-10 w-10 rounded-full border-2 border-white" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        {!cameraActive ? (
          <Button 
            variant="secondary" 
            className="flex items-center gap-2"
            onClick={startCamera}
          >
            <Camera className="h-4 w-4" />
            <span>Use Camera</span>
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={stopCamera}
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReceiptUploader;
