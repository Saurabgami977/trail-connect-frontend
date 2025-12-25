import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export function LoginModal({ redirectUrl }: { redirectUrl?: string }) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const [showLoginDialog, setShowLoginDialog] = useState(true);

  useEffect(() => {
    if (user) {
      setShowLoginDialog(false);
    }
  }, [user]);

  return (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogContent className="max-w-md" isCloseable={false}>
        <DialogHeader>
          <DialogTitle>Login / Register</DialogTitle>
          <DialogDescription>
            Please login or create an account to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              You need to be logged in to access this feature.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full cursor-pointer"
              size="lg"
              onClick={() => router.push(`/login`)}
            >
              Login
            </Button>

            <Button
              className="w-full cursor-pointer"
              variant="outline"
              size="lg"
              onClick={() => router.push(`/register`)}
            >
              Register
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
