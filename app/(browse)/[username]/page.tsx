import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

type UserPageProps = {
  params: {
    username: string;
  };
}

export default async function UserPage(props: UserPageProps) {
  const user = await getUserByUsername(props.params.username);
  
  if (!user) {
    return notFound();
  }

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div>
      <h1>User : {user.username} Page</h1>
      <h1>Is isFollowing {String(isFollowing)}</h1>
      <Actions userId={user.id} isFollowing={isFollowing}/>
    </div>
  );
}