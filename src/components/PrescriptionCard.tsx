import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface PrescriptionCardProps {
  prescription: {
    id: string;
    file_url: string | null;
    uploaded_at: string;
  };
}

// Extract a storage path from either a raw path or a legacy full URL.
const extractStoragePath = (value: string): string => {
  const marker = "/prescriptions/";
  const idx = value.indexOf(marker);
  if (value.startsWith("http") && idx !== -1) {
    return value.substring(idx + marker.length).split("?")[0];
  }
  return value;
};

const isImagePath = (path: string) =>
  /\.(png|jpe?g|webp|gif)$/i.test(path.split("?")[0]);

export const PrescriptionCard = ({ prescription }: PrescriptionCardProps) => {
  const { toast } = useToast();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const path = prescription.file_url ? extractStoragePath(prescription.file_url) : null;

  const ensureSignedUrl = async (): Promise<string | null> => {
    if (!path) return null;
    if (signedUrl) return signedUrl;
    const { data, error } = await supabase.storage
      .from("prescriptions")
      .createSignedUrl(path, 60 * 10); // 10 minutes
    if (error || !data?.signedUrl) {
      console.error("Signed URL error:", error);
      toast({
        title: "Unable to load prescription",
        description: error?.message || "File not found in storage.",
        variant: "destructive",
      });
      return null;
    }
    setSignedUrl(data.signedUrl);
    return data.signedUrl;
  };

  const handleView = async () => {
    setLoading(true);
    const url = await ensureSignedUrl();
    setLoading(false);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // Auto-load thumbnail signed URL for images
  useState(() => {
    if (path && isImagePath(path)) {
      ensureSignedUrl();
    }
  });

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted flex items-center justify-center">
        {path && isImagePath(path) && signedUrl ? (
          <img
            src={signedUrl}
            alt="Prescription"
            className="h-full w-full object-cover"
          />
        ) : (
          <FileText className="h-12 w-12 text-muted-foreground" />
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          Uploaded on {format(new Date(prescription.uploaded_at), "MMM dd, yyyy")}
        </p>
        {path && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={handleView}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            View
          </Button>
        )}
      </div>
    </Card>
  );
};