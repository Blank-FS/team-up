import { z } from "zod";

export const formSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  role: z.string().nonempty("Role is required"),
  bio: z.string().optional(),
  school: z.string().nonempty("School is required"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  customSkills: z.string().optional(),
});
