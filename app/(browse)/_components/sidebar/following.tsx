"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

type FollowingProps = { data: (Follow & { following: User })[] };

export function Following(props: FollowingProps) {
  const { collapsed } = useSidebar((state) => state);

  if (props.data.length === 0) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {props.data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
}

export function FollowingSkeleton() {
  return (
    <ul>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
}
