// app/cp1/page.tsx (SERVER COMPONENT)


import { auth } from "@/auth";
import SignOutButton from "@/components/ui/SignOutBtn";
import UploadReoportBtn from "@/components/ui/UploadReportBtn";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-5 w-full justify-center items-center">
      <UploadReoportBtn checkpointId="7" description="Checkpoint 7 Area"/>
      <SignOutButton />


    </div>
  )
}
