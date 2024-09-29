import { getUserByEmail, getUserReceiveInvites } from "@/lib/utils/users";
import { getInfo } from "@/lib/utils/users";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { getUserById } from "@/lib/utils/users";
import { getTeamById } from "@/lib/utils/teams";
export async function GET(req: Request) {
  const session = (await getInfo()) as UserProfile;
  const user = await getUserByEmail(session.email as string);

  const invites = await getUserReceiveInvites(user?.user_id as string);
  if (!invites) {
    return new Response(JSON.stringify({ error: "No invites found" }), {
      status: 404,
    });
  }
  const invitesWithDetails = await Promise.all(
    invites.map(async (invite) => {
      const sender = await getUserById(invite.senderID);
      const receiver = await getUserById(invite.receiverID);
      const team = await getTeamById(invite.teamID);
      return {
        ...invite,
        sender,
        receiver,
        team,
      };
    })
  );

  return new Response(JSON.stringify(invitesWithDetails), {
    status: 200,
  });
}
