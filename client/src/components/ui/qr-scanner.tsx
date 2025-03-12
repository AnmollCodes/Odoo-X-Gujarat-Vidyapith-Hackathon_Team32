import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader, QrCode, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QrScannerProps {
  onScan: (data: string) => void;
}

export function QrScanner({ onScan }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  const startScanning = async () => {
    setCameraError(null);
    setIsScanning(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Start checking for QR codes
        checkForQrCode();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Unable to access camera. Please check permissions and try again.");
      setIsScanning(false);
      
      toast({
        title: "Camera Access Error",
        description: "Unable to access your camera. Please check permissions and try again.",
        variant: "destructive"
      });
    }
  };
  
  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };
  
  const checkForQrCode = () => {
    if (!canvasRef.current || !videoRef.current || !isScanning) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Draw the video frame to the canvas
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Here we would use a QR code library to scan the canvas
      // For a real implementation, you'd need to add a QR code scanning library
      // like "jsQR" or "qr-scanner"
      
      // Simulating QR code detection
      // In a real implementation, you'd replace this with actual QR code detection
      const simulateQrDetection = () => {
        // This would be replaced with actual QR code library detection
        if (Math.random() < 0.01) { // Simulate occasional detection
          const mockQrData = `product_${Math.floor(Math.random() * 10) + 1}_verification`;
          onScan(mockQrData);
          stopScanning();
          
          toast({
            title: "QR Code Detected",
            description: "Successfully scanned a product QR code.",
          });
          
          return true;
        }
        return false;
      };
      
      if (!simulateQrDetection() && isScanning) {
        // Continue scanning if no QR code was detected
        requestAnimationFrame(checkForQrCode);
      }
    } else {
      requestAnimationFrame(checkForQrCode);
    }
  };
  
  // Clean up function to stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (isScanning) {
        stopScanning();
      }
    };
  }, [isScanning]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        {isScanning ? (
          <>
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas 
              ref={canvasRef} 
              className="hidden" // Hidden but used for processing
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 border-2 border-primary-500 rounded-lg opacity-70"></div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <QrCode className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center mb-2">
              {cameraError || "Position the QR code inside the frame to scan"}
            </p>
          </div>
        )}
      </div>
      
      <Button 
        onClick={isScanning ? stopScanning : startScanning}
        className={isScanning ? "bg-red-500 hover:bg-red-600" : "bg-primary-500 hover:bg-primary-600"}
      >
        {isScanning ? (
          <>Stop Scanning</>
        ) : (
          <>
            <Camera className="mr-2 h-4 w-4" />
            Start Camera Scan
          </>
        )}
      </Button>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>You can also enter a product ID manually to verify its authenticity.</p>
      </div>
    </div>
  );
}

export default QrScanner;
