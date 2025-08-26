"use client";
import { useEffect } from "react";
import { SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      toast.success('Redirecting to the dashboard')
      router.push("/workspace");
    }
  }, [isSignedIn, router]);

  return (
    <div className="text-center p-10">
      <SignedOut>
        <SignInButton >
          <button className="text-2xl bg-blue-600 text-white p-2 rounded-md  cursor-pointer active:bg-blue-300" >Sign In</button >
        </SignInButton>
      </SignedOut>
      <h1 className="text-5xl font-bold mt-10">
        Here should be the Landing page design
      </h1>
    
    </div>
  );
}
