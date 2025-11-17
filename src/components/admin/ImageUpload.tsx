import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
}

const ImageUpload = ({ currentImageUrl, onImageUploaded }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('content-images')
        .getPublicUrl(filePath);

      onImageUploaded(data.publicUrl);
      
      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo subir la imagen",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Imagen</Label>
      {currentImageUrl && (
        <div className="mb-2">
          <img
            src={currentImageUrl}
            alt="Preview"
            className="h-32 w-auto object-cover rounded"
          />
        </div>
      )}
      <div className="flex gap-2">
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
    </div>
  );
};

export default ImageUpload;
