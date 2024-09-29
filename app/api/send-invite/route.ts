import { createInvite } from "@/lib/utils/invites";

export async function POST(req: Request) {
  const data = await req.json();
  const { team_id, sender_id, receiver_id } = data;

  await createInvite({
    teamID: team_id,
    senderID: sender_id,
    receiverID: receiver_id,
  });

  return new Response(JSON.stringify({ message: "Invite sent successfully" }), {
    status: 200,
  });
}
