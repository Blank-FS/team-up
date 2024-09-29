import { getInfo, getUserByEmail, getUserTeams } from "@/lib/utils/users";
import { UserProfile } from "@auth0/nextjs-auth0/client";
export async function GET(req: Request) {
  const user = (await getInfo()) as UserProfile;
  const userByEmail = await getUserByEmail(user.email as string);
  const user_id = userByEmail?.user_id as string;

  const userTeams = await getUserTeams(user_id);
  return Response.json(userTeams);
}
