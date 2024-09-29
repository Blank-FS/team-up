import { createProfile, getInfo, hasProfile, updateProfile } from "@/lib/utils/users";

export async function POST(req: Request) {
  try {
    const user = await getInfo();
    const data = await req.json();

    const customSkillsArray = data.customSkills
      ? data.customSkills.split(",").map((skill: string) => skill.trim())
      : [];
    const updatedSkills = Array.from(new Set([...data.skills, ...customSkillsArray]));

    const updatedUser = {
      ...data,
      skills: updatedSkills,
    };

    delete updatedUser.customSkills;

    console.log(updatedUser);

    await updateProfile(user.email, updatedUser);

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
