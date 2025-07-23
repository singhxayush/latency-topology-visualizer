"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Dashboard
      </Button>
    </div>
  );
}
