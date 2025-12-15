// app/cp1/page.tsx (SERVER COMPONENT)


import { auth } from "@/auth";
import SignOutButton from "@/components/ui/SignOutBtn";
import UploadReoportBtn from "@/components/ui/UploadReportBtn";
import UploadImageBtn from "@/components/ui/uploadImageBtn";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-5 w-full justify-center items-center">
      <UploadReoportBtn checkpointId="1" />
      <SignOutButton />


    </div>
  )
}
