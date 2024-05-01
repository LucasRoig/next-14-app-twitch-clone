"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

type ActionsProps = {
  isFollowing: boolean;
  userId: string;
};

export function Actions(props: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const follow = () => {
    startTransition(() => {
      onFollow(props.userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`);
        })
        .catch(() => {
          toast.error("Failed to follow user");
        });
    });
  }

  const unfollow = () => {
    startTransition(() => {
      onUnfollow(props.userId)
        .then((data) => {
          toast.success(`You are no longer following ${data.following.username}`);
        })
        .catch(() => {
          toast.error("Failed to unfollow user");
        });
    });
  }

  const onClick = () => {
    if (props.isFollowing) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <Button variant="primary" onClick={onClick} disabled={isPending}>
      {props.isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
