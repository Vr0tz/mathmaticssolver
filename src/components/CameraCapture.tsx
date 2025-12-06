import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, RotateCcw, Check, SwitchCamera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64: string) => void;
}

export const CameraCapture = ({ isOpen, onClose, onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const startCamera = useCallback(async (facing: 'environment' | 'user' = facingMode) => {
    try {
      setError(null);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  }, [facingMode, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const flipCamera = useCallback(() => {
    const newFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacing);
    startCamera(newFacing);
  }, [facingMode, startCamera]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const takePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const base64 = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(base64);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const retake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const confirmPhoto = useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
      onClose();
    }
  }, [capturedImage, onCapture, onClose]);

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  }, [stopCamera, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <h2 className="text-lg font-semibold text-foreground">Take Photo</h2>
        <button
          onClick={handleClose}
          className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="text-center p-8">
            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => startCamera()} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        ) : capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="max-w-full max-h-full object-contain"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {}
      <div className="p-6 border-t border-border/30 relative z-50">
        {capturedImage ? (
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              onClick={retake}
              variant="outline"
              size="lg"
              className="px-8 pointer-events-auto"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake
            </Button>
            <Button
              type="button"
              onClick={confirmPhoto}
              size="lg"
              className="px-8 bg-primary hover:bg-primary/90 pointer-events-auto"
            >
              <Check className="w-5 h-5 mr-2" />
              Use Photo
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-8">
            <button
              type="button"
              onClick={flipCamera}
              disabled={!stream}
              className={cn(
                "w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center transition-all pointer-events-auto",
                stream ? "hover:bg-secondary/80 hover:scale-105" : "opacity-50"
              )}
            >
              <SwitchCamera className="w-6 h-6 text-foreground" />
            </button>
            <button
              type="button"
              onClick={takePhoto}
              disabled={!stream}
              className={cn(
                "w-20 h-20 rounded-full border-4 border-foreground/80 flex items-center justify-center transition-all pointer-events-auto",
                stream ? "hover:scale-105 active:scale-95" : "opacity-50"
              )}
            >
              <div className="w-16 h-16 rounded-full bg-foreground/90 pointer-events-none" />
            </button>
            <div className="w-12 h-12" /> {}
          </div>
        )}
      </div>
    </div>
  );
};