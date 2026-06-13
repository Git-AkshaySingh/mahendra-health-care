import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, UserCog, Pencil, Trash2, Ban, KeyRound, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboardRole } from "./AdminLayout";
import { ShieldAlert } from "lucide-react";

const Users = () => {
  const role = useDashboardRole();
  if (role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShieldAlert className="h-10 w-10 text-muted-foreground mb-3"/>
        <h2 className="text-xl font-semibold">Permission denied</h2>
        <p className="text-muted-foreground">User management is restricted to administrators.</p>
      </div>
    );
  }
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "staff" as "staff" | "admin" });
  const [submitting, setSubmitting] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [editForm, setEditForm] = useState({ full_name: "", email: "", phone: "" });
  const [resetUser, setResetUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [deleteUser, setDeleteUser] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const callManage = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("manage-user", { body });
    if (error || (data as any)?.error) {
      toast({ title: "Error", description: (data as any)?.error || error?.message || "Failed", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!form.email || !form.password) {
      toast({ title: "Missing fields", description: "Email and password required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("create-staff-user", { body: form });
    setSubmitting(false);
    if (error || (data as any)?.error) {
      toast({ title: "Error", description: (data as any)?.error || error?.message || "Failed", variant: "destructive" });
      return;
    }
    toast({ title: "Created", description: `${form.role} account created` });
    setForm({ email: "", password: "", full_name: "", role: "staff" });
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["admin-users"] });
  };

  const handleEditSave = async () => {
    if (!editUser) return;
    setBusy(true);
    const ok = await callManage({ action: "update_profile", user_id: editUser.id, ...editForm });
    setBusy(false);
    if (ok) {
      toast({ title: "Updated" });
      setEditUser(null);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    }
  };

  const handleReset = async () => {
    if (!resetUser) return;
    if (newPassword.length < 6) {
      toast({ title: "Password too short", variant: "destructive" });
      return;
    }
    setBusy(true);
    const ok = await callManage({ action: "reset_password", user_id: resetUser.id, password: newPassword });
    setBusy(false);
    if (ok) {
      toast({ title: "Password reset" });
      setResetUser(null);
      setNewPassword("");
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    setBusy(true);
    const ok = await callManage({ action: "delete", user_id: deleteUser.id });
    setBusy(false);
    if (ok) {
      toast({ title: "User deleted" });
      setDeleteUser(null);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    }
  };

  const handleToggleDisable = async (u: any) => {
    setBusy(true);
    const ok = await callManage({ action: u.disabled ? "enable" : "disable", user_id: u.id });
    setBusy(false);
    if (ok) {
      toast({ title: u.disabled ? "User enabled" : "User disabled" });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    }
  };

  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole, currentRoles }: { userId: string; newRole: "admin" | "staff" | "user"; currentRoles: any[] }) => {
      // First, remove all existing roles for the user
      const existingRoleIds = currentRoles.map(r => r.id);
      if (existingRoleIds.length > 0) {
        const { error: deleteError } = await supabase
          .from("user_roles")
          .delete()
          .in("id", existingRoleIds);
        if (deleteError) throw deleteError;
      }

      // Then add the new role
      const { error: insertError } = await supabase
        .from("user_roles")
        .insert([{ user_id: userId, role: newRole }]);
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "Success", description: "User role updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const getUserRole = (roles: any[]) => {
    if (!roles || roles.length === 0) return "user";
    // Priority: admin > staff > user
    if (roles.some((r) => r.role === "admin")) return "admin";
    if (roles.some((r) => r.role === "staff")) return "staff";
    return "user";
  };

  const getRoleBadgeVariant = (role: string) => {
    if (role === "admin") return "default";
    if (role === "staff") return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4"/>Create Staff</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Staff Account</DialogTitle>
              <DialogDescription>Creates a new user with staff or admin privileges.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div><Label>Full Name</Label><Input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} /></div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>Password</Label><Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
              <div><Label>Role</Label>
                <Select value={form.role} onValueChange={(v: any) => setForm({ ...form, role: v })}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={submitting}>{submitting ? "Creating..." : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => {
              const userRole = getUserRole(user.user_roles);
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(userRole)}>
                      {userRole}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-1">
                    <Select
                      value={userRole}
                      onValueChange={(newRole) =>
                        updateRoleMutation.mutate({
                          userId: user.id,
                          newRole: newRole as "admin" | "staff" | "user",
                          currentRoles: user.user_roles,
                        })
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <UserCog className="mr-2 h-4 w-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" title="Edit"
                      onClick={() => { setEditUser(user); setEditForm({ full_name: user.full_name || "", email: user.email || "", phone: user.phone || "" }); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title={user.disabled ? "Enable" : "Disable"}
                      onClick={() => handleToggleDisable(user)} disabled={busy}>
                      {user.disabled ? <CheckCircle2 className="h-4 w-4 text-green-600"/> : <Ban className="h-4 w-4"/>}
                    </Button>
                    <Button variant="ghost" size="icon" title="Reset password"
                      onClick={() => { setResetUser(user); setNewPassword(""); }}>
                      <KeyRound className="h-4 w-4"/>
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete"
                      onClick={() => setDeleteUser(user)}>
                      <Trash2 className="h-4 w-4 text-destructive"/>
                    </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update basic user details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Full Name</Label><Input value={editForm.full_name} onChange={e => setEditForm({...editForm, full_name: e.target.value})} /></div>
            <div><Label>Email</Label><Input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} /></div>
            <div><Label>Phone</Label><Input value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>Cancel</Button>
            <Button onClick={handleEditSave} disabled={busy}>{busy ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset password */}
      <Dialog open={!!resetUser} onOpenChange={(o) => !o && setResetUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Set a new password for {resetUser?.email}.</DialogDescription>
          </DialogHeader>
          <div><Label>New Password</Label><Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetUser(null)}>Cancel</Button>
            <Button onClick={handleReset} disabled={busy}>{busy ? "Saving..." : "Reset"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteUser} onOpenChange={(o) => !o && setDeleteUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes {deleteUser?.email}. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={busy}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Users;
