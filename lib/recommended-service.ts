import { getSelf } from "./auth-service";
import { db } from "./db";
import { Prisma } from "@prisma/client";
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRecommended() {
  let userId: undefined | string;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = undefined;
  }

  let users: Prisma.Result<typeof db.user, {}, "findMany"> = []

  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // await sleep(5000);
  // const users = await db.user.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  return users;
}