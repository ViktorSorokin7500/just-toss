import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  className?: string;
  onClickSignIn?: () => void;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession();
  return (
    <div className={cn(className)}>
      {session ? (
        <Button asChild variant="secondary" className="flex items-center gap-2">
          <Link href="/profile">
            <CircleUser size={16} />
            {session?.user?.name}
          </Link>
        </Button>
      ) : (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Enter
        </Button>
      )}
    </div>
  );
};
