import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FileText, Eye, Loader2, Pencil, Trash2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

interface PrescriptionCardProps {
  prescription: {
    id: string;
    file_url: string | null;
    uploaded_at: string;
    title?: string | null;
    description?: string | null;
  };
  canEdit?: boolean;
  canDelete?: boolean;
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

export const PrescriptionCard = ({ prescription, canEdit = true, canDelete = true }: PrescriptionCardProps) => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState(prescription.title || "");
  const [description, setDescription] = useState(prescription.description || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleSaveEdit = async () => {
    if (!title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("prescriptions")
      .update({ title: title.trim(), description: description.trim() || null })
      .eq("id", prescription.id);
    setSaving(false);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Prescription updated" });
    setEditOpen(false);
    qc.invalidateQueries({ queryKey: ["customer-prescriptions"] });
    qc.invalidateQueries({ queryKey: ["admin-customer-detail"] });
  };

  const handleDelete = async () => {
    setDeleting(true);
    if (path) {
      await supabase.storage.from("prescriptions").remove([path]);
    }
    const { error } = await supabase.from("prescriptions").delete().eq("id", prescription.id);
    setDeleting(false);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Prescription deleted" });
    setDeleteOpen(false);
    qc.invalidateQueries({ queryKey: ["customer-prescriptions"] });
    qc.invalidateQueries({ queryKey: ["admin-customer-detail"] });
  };

  // Auto-load thumbnail signed URL for images
  useEffect(() => {
    if (path && isImagePath(path)) {
      ensureSignedUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

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
      <div className="p-4 space-y-2">
        <p className="font-medium truncate">{prescription.title || "Prescription"}</p>
        {prescription.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{prescription.description}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Uploaded {format(new Date(prescription.uploaded_at), "MMM dd, yyyy")}
        </p>
        {path && (
          <div className="flex flex-wrap gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={handleView} disabled={loading}>
              {loading ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Eye className="h-3.5 w-3.5 mr-1" />}
              View
            </Button>
            {canEdit && (
              <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
              </Button>
            )}
            {canDelete && (
              <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
              </Button>
            )}
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Prescription</DialogTitle>
            <DialogDescription>Update title and description.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1"><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this prescription?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the file and record. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};