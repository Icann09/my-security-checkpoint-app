"use client"

import AuthForm from "@/components/ui/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth"
import { signInSchema } from "@/lib/validations"


export default function Page() {
  return (
    <div>
      <AuthForm 
        type="SIGN_IN"
      />
    </div>
  )
}