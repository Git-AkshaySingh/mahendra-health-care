import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DeleteAccountSection = ({ userId }: { userId?: string }) => {
  const { toast } = useToast();
  const [requestedAt, setRequestedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("deletion_requested_at")
        .eq("id", userId)
        .maybeSingle();
      setRequestedAt((data as any)?.deletion_requested_at ?? null);
    })();
  }, [userId]);

  const request = async () => {
    if (!userId) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ deletion_requested_at: new Date().toISOString() })
      .eq("id", userId);
    setLoading(false);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    setRequestedAt(new Date().toISOString());
    toast({ title: "Deletion scheduled", description: "Your account will be permanently deleted in 14 days." });
  };

  const cancel = async () => {
    if (!userId) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ deletion_requested_at: null })
      .eq("id", userId);
    setLoading(false);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    setRequestedAt(null);
    toast({ title: "Cancelled", description: "Account deletion request cancelled." });
  };

  return (
    <div>
      <h3 className="font-medium mb-2 flex items-center gap-2 text-destructive">
        <AlertTriangle className="h-4 w-4" /> Delete Account
      </h3>
      {requestedAt ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Your account is scheduled for permanent deletion on{" "}
            <span className="font-medium text-foreground">
              {format(addDays(new Date(requestedAt), 14), "MMM dd, yyyy")}
            </span>
            . All your data will be removed.
          </p>
          <Button variant="outline" onClick={cancel} disabled={loading}>
            Cancel deletion request
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground max-w-xl">
            Request permanent deletion of your account. Your data will be retained for 14 days
            in case you change your mind, then permanently removed.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={loading}>Request account deletion</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  We will keep your data for 14 days, then permanently delete your profile,
                  prescriptions and order history. You can cancel anytime within those 14 days.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep account</AlertDialogCancel>
                <AlertDialogAction onClick={request}>Request deletion</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};