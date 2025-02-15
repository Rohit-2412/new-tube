import { Button } from "@/components/ui/button";
import React from "react";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  // add different auth state
  return (
    <Button
      variant="outline"
      className="px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
    >
      <UserCircleIcon />
      Sign In
    </Button>
  );
};
