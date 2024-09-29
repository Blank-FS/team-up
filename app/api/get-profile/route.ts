import { getInfo, getUserByEmail } from "@/lib/utils/users";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export async function GET(req: Request) {
    const user = await getInfo() as UserProfile;
    const userByEmail = await getUserByEmail(user.email as string);

    return new Response(JSON.stringify(userByEmail), {
        status: 200,
    });
}