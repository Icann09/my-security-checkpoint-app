import { auth } from "@/auth"
import { redirect } from "next/navigation";


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-container">
      <div>
        {children}
      </div>
    </main>
  )
}