import { getUserByEmail, getUserReceiveInvites } from "@/lib/utils/users";
import { getInfo } from "@/lib/utils/users";
import { UserProfile } from "@auth0/nextjs-auth0/client";
export async function GET(req: Request) {
  const session = (await getInfo()) as UserProfile;
  const user = await getUserByEmail(session.email as string);

  const res = await getUserReceiveInvites(user?.user_id as string);
  return new Response(JSON.stringify(res), { status: 200 });
}
