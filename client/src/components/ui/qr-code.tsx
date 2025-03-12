import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QrCodeProps {
  data: string;
  size?: number;
  downloadable?: boolean;
}

export function QrCode({ data, size = 200, downloadable = true }: QrCodeProps) {
  const { toast } = useToast();
  
  // Generate QR code URL using an external service
  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  }, [data, size]);
  
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `agrichain-qr-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "The QR code has been downloaded successfully."
    });
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-3 rounded-lg shadow-md">
        <img 
          src={qrCodeUrl} 
          alt="Product QR Code" 
          className="max-w-full"
          width={size}
          height={size}
        />
      </div>
      
      {downloadable && (
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      )}
      
      <p className="mt-3 text-sm text-gray-500 text-center max-w-xs">
        Scan this QR code to verify the authenticity of this product on the blockchain.
      </p>
    </div>
  );
}

export default QrCode;
