import { auth } from "@/config/Config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useReroute(path: string, condition : boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(path);
    }
  }, [condition, path, router]);
}
