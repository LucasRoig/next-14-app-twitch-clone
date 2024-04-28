import { LiveBadge } from "@/components/live-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UserItemProps = {
  username: string;
  imageUrl: string;
  isLive?: boolean;
};

export function UserItem(props: UserItemProps) {
  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${props.username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            imageUrl={props.imageUrl}
            isLive={props.isLive}
            username={props.username}
          />
          {!collapsed && (
            <p className="truncate">{props.username}</p>
          )}
          {!collapsed && props.isLive && (
            <LiveBadge className="ml-auto"/>
          )}
        </div>
      </Link>
    </Button>
  );
}

export function UserItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}