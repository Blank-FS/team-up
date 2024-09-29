import { completeInvite } from "@/lib/utils/invites";

export async function POST(req: Request) {
  const { accept, invite_id } = await req.json();
  try {
    await completeInvite(accept, invite_id);
    return new Response(JSON.stringify({ message: accept ? "Invite accepted" : "Invite rejected" }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}