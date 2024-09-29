import { hasFullProfile, getInfo } from "@/lib/utils/users";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  try {
    const user = await getInfo() as UserProfile;
    const hasProfile = await hasFullProfile(user.email as string);

    return new Response(JSON.stringify({ hasFullProfile: hasProfile }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error checking profile" }), {
      status: 500,
    });
  }
}
