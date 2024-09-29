import { UserForm } from "@/lib/forms";
import { createProfile, getInfo, updateProfile } from "@/lib/utils/users";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export async function POST(req: Request) {
  try {
    const user = (await getInfo()) as UserProfile;
    const data = await req.json();

    const customSkillsArray = data.customSkills
      ? data.customSkills.split(",").map((skill: string) => skill.trim())
      : [];
    const updatedSkills: string[] = Array.from(
      new Set([...data.skills, ...customSkillsArray])
    );

    const updatedUser: UserForm = {
      user_name: user.nickname,
      email: user.email,
      avatar: user.picture,
      ...data,
      skills: updatedSkills,
    };

    await createProfile(updatedUser);

    return new Response(
      JSON.stringify({ message: "Profile created successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating profile" }), {
      status: 500,
    });
  }
}
