"use client"

import AuthForm from "@/components/ui/AuthForm"


export default function Page() {
  return (
    <div>
      <AuthForm 
        type="SIGN_IN"
        path="/cp6"
      />
    </div>
  )
}