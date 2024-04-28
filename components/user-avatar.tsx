import { VariantProps, cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type UserAvatarProps = {
  imageUrl: string;
  isLive?: boolean;
  username: string;
  showBadge?: boolean;
} & VariantProps<typeof avatarSizes>;

export function UserAvatar(props: UserAvatarProps) {
  const canShowBadge = props.showBadge && props.isLive;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          props.isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size: props.size })
        )}
      >
        <AvatarImage src={props.imageUrl} className="object-cover" />
        <AvatarFallback>
          {props.username[0]}
          {props.username[props.username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>;

export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
}
