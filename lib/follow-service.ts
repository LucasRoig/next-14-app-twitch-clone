import { db } from "./db";
import { getSelf } from "./auth-service";

export async function isFollowingUser(userId: string) {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      }
    })

    return Boolean(existingFollow);
  } catch (error) {
    return false;
  }
}

export async function followUser(id: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    },
  });

  if (existingFollow) {
    throw new Error("Already following user");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
}

export async function unfollowUser(id: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    },
  });

  if (!existingFollow) {
    throw new Error("Not following user");
  }

  const result = db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    }
  });

  return result;
}