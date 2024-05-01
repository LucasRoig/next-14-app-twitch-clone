import { db } from "./db";

export function getUserByUsername(username: string) {
  const user = db.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}