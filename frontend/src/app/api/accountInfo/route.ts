import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function PUT(req: Request) {

  try {
    const userInfo = await req.json()
    const { username, email, newPassword, confirmPassword } = userInfo

    // Get the authorization header
    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Create Supabase client with service role for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // Verify the user token
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    // Validate password confirmation if password is being updated
    if (newPassword && newPassword !== confirmPassword) {
      return NextResponse.json({ error: "New passwords don't match" }, { status: 400 })
    }

    const updates = []

    // Update username in profiles table if provided
    if (username) {
      const { error: profileError } = await supabaseAdmin.from("profiles").update({ username }).eq("id", user.id)

      if (profileError) {
        console.error("Profile update error:", profileError)
        return NextResponse.json(
          {
            error: `Failed to update username: ${profileError.message}`,
          },
          { status: 500 },
        )
      }
      updates.push("username")
    }

    // Update email if provided
    if (email) {
      const { error: emailError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
        email: email,
      })
      const {error: profileError} = await supabaseAdmin.from("profiles").update({email}).eq("id", user.id)
      if (profileError){
        console.error("Profile email update error:", profileError)
        return NextResponse.json(
          {
            error: `Failed to update profile email: ${profileError.message}`,
          },
          { status: 500 },
        )
      }

      if (emailError) {
        console.error("Email update error:", emailError)
        return NextResponse.json(
          {
            error: `Failed to update email: ${emailError.message}`,
          },
          { status: 500 },
        )
      }
      updates.push("email")
    }

    return NextResponse.json({
      success: true,
      message: `Profile updated successfully! Updated: ${updates.join(", ")}`,
      updates,
    })
  } catch (error: unknown) {
    let message = "Failed to update profile";
    if (error instanceof Error) {
        message = error.message;
    }
    return NextResponse.json(
      {
        error: message || "Failed to update profile",
      },
      { status: 500 },
    )
  }
}
