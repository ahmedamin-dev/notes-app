"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/theme-toggle";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleLogtout = async () => {
    const res = await authClient.signOut();
    if (res.error) {
      console.error("Error logging out ", res.error);
      toast.error("Failed to logout");
    } else {
      toast.success("Logged out successfully");
      router.push("/");
    }
  };
  return (
    <header className="border-b">
      <nav className="flex items-center justify-between px-5 py-4 w-full max-w-7xl mx-auto">
        <div>Noted.</div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button onClick={handleLogtout}>Logout</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
