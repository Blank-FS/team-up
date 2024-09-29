import { getUserByEmail } from "@/lib/utils/users";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const user = await getUserByEmail(email as string);
    return new Response(JSON.stringify(user), { status: 200 });
}