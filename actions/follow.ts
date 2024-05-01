"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);
    
    revalidatePath("/");
    
    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }
    return followedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to follow user");
  }
}

export async function onUnfollow(id: string) {
  try {
    const unfollowedUser =  await unfollowUser(id);
    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to unfollow user");
  }
}