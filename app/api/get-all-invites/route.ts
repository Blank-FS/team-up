import { getUserByEmail, getUserReceiveInvites } from "@/lib/utils/users";
import { getInfo } from "@/lib/utils/users";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { getUserById } from "@/lib/utils/users";
export async function GET(req: Request) {
  const session = (await getInfo()) as UserProfile;
  const user = await getUserByEmail(session.email as string);

  const invites = await getUserReceiveInvites(user?.user_id as string);
  if (!invites) {
    return new Response(JSON.stringify({ error: "No invites found" }), { status: 404 });
  }
  const sender = await getUserById(invites[0].senderID);
  const receiver = await getUserById(invites[0].receiverID);
  
  return new Response(JSON.stringify({
    ...invites,
    sender : sender,
    receiver : receiver,
  }), { status: 200 });
}
