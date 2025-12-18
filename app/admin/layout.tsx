import { auth } from "@/auth"
import { redirect } from "next/navigation";


import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const user = await db
    .select({ role: users.name })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then(res => res[0]);

  if (!user || user.role !== "PLTD RAHA") redirect("/");

  return (
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
  );
}
