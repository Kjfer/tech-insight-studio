import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  onImageDeleted?: () => void;
  recommendedSpecs?: string;
  maxSizeMB?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const ImageUpload = ({ 
  currentImageUrl, 
  onImageUploaded, 
  onImageDeleted,
  recommendedSpecs = "Recomendado: 1200x800px, máx 1MB",
  maxSizeMB = 2,
  maxWidth = 2400,
  maxHeight = 2400
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño del archivo
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast({
        title: "Error",
        description: `La imagen debe pesar menos de ${maxSizeMB}MB. Tamaño actual: ${fileSizeMB.toFixed(2)}MB`,
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    // Validar dimensiones
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = async () => {
      URL.revokeObjectURL(objectUrl);
      
      if (img.width > maxWidth || img.height > maxHeight) {
        toast({
          title: "Error",
          description: `Dimensiones máximas: ${maxWidth}x${maxHeight}px. Imagen actual: ${img.width}x${img.height}px`,
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      // Proceder con la subida
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
        e.target.value = "";
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      toast({
        title: "Error",
        description: "No se pudo cargar la imagen",
        variant: "destructive",
      });
      e.target.value = "";
    };

    img.src = objectUrl;
  };

  const handleDelete = async () => {
    if (!currentImageUrl || !confirm("¿Estás seguro de eliminar esta imagen?")) return;

    setDeleting(true);
    try {
      // Extract file path from URL
      const url = new URL(currentImageUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];

      const { error } = await supabase.storage
        .from('content-images')
        .remove([fileName]);

      if (error) throw error;

      onImageDeleted?.();
      
      toast({
        title: "Imagen eliminada",
        description: "La imagen se ha eliminado correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la imagen",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleLinkSubmit = () => {
    if (!imageLink.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un link válido",
        variant: "destructive",
      });
      return;
    }

    // Convert Google Drive links to direct image URLs
    let finalUrl = imageLink;
    if (imageLink.includes('drive.google.com')) {
      const fileIdMatch = imageLink.match(/\/d\/([^\/]+)/) || imageLink.match(/id=([^&]+)/);
      if (fileIdMatch) {
        finalUrl = `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1000`;
      }
    }

    onImageUploaded(finalUrl);
    toast({
      title: "Link agregado",
      description: "El link de la imagen se ha agregado correctamente",
    });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Imagen</Label>
      <p className="text-xs text-muted-foreground">{recommendedSpecs}</p>
      {currentImageUrl && (
        <div className="mb-2 relative">
          <img
            src={currentImageUrl}
            alt="Preview"
            className="h-32 w-auto object-cover rounded"
          />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="mt-2"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Eliminar imagen"}
          </Button>
        </div>
      )}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Subir Archivo
          </TabsTrigger>
          <TabsTrigger value="link">
            <LinkIcon className="h-4 w-4 mr-2" />
            Link de Drive
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="space-y-2">
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
        </TabsContent>
        <TabsContent value="link" className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="https://drive.google.com/file/d/..."
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <Button type="button" onClick={handleLinkSubmit}>
              Agregar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Pega el link de Google Drive de una imagen compartida públicamente
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageUpload;
