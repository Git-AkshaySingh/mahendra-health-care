import { supabase } from "@/integrations/supabase/client";

/**
 * Script to create an admin user
 * Email: admin@mahendrahealthcare.com
 * Password: password@123
 * 
 * Note: This should be run manually through browser console or as a one-time setup
 */

export async function createAdminUser() {
  const email = "admin@test123.com";
  const password = "password@123";

  try {
    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: "Admin User",
        },
      },
    });

    if (signUpError) {
      console.error("Error creating user:", signUpError);
      return { success: false, error: signUpError };
    }

    console.log("User created successfully:", signUpData.user?.email);

    // Wait a moment for triggers to complete
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update the user role to admin
    if (signUpData.user) {
      const { error: roleError } = await supabase
        .from("user_roles")
        .update({ role: "admin" })
        .eq("user_id", signUpData.user.id);

      if (roleError) {
        console.error("Error updating role:", roleError);
        return { success: false, error: roleError };
      }

      console.log("Admin role assigned successfully!");
      return {
        success: true,
        message: "Admin user created successfully! You can now login with the provided credentials.",
      };
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error };
  }
}

// To run this script, paste the following in browser console after app loads:
// import("./scripts/createAdminUser").then(m => m.createAdminUser());
