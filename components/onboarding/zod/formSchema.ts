import { z } from "zod";

export const experienceSchema = z.object({
  title: z.string().nonempty("Job title is required"),
  company: z.string().nonempty("Company is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  description: z.string().optional(),
});

export const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  school: z.string().nonempty("School is required"),
  graduationYear: z.string().nonempty("Graduation year is required"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  customSkills: z.string().optional(),
  experiences: z.array(experienceSchema).min(1, "Add at least one experience"),
});