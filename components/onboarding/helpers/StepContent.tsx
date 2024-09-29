import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { predefinedSkills } from "@/lib/mocks";

interface StepContentProps {
  step: number;
  formData: any;
  setValue: (name: string, value: any) => void;
  validateStep: (step: number) => boolean;
  handleSubmit: (
    callback: (data: any) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: any) => void;
  errors: any;
  currentStep: number;
}

const StepContent: React.FC<StepContentProps> = ({
  step,
  formData,
  setValue,
  validateStep,
  handleSubmit,
  onSubmit,
  errors,
  currentStep,
}) => {
  const { control } = useFormContext();

  switch (step) {
    case 0:
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <Input
                  id="first_name"
                  placeholder="Enter your first name"
                  {...field}
                />
              )}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <Input
                  id="last_name"
                  placeholder="Enter your last name"
                  {...field}
                />
              )}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>
        </div>
      );
    case 1:
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Input id="role" placeholder="Enter your role" {...field} />
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea id="bio" placeholder="Enter a short bio" {...field} />
              )}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Controller
              name="school"
              control={control}
              render={({ field }) => (
                <Input
                  id="school"
                  placeholder="Enter your school name"
                  {...field}
                />
              )}
            />
            {errors.school && (
              <p className="text-red-500 text-sm">{errors.school.message}</p>
            )}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-4">
          <Label>Skills (Select at least one)</Label>
          <div className="grid grid-cols-2 gap-2">
            {predefinedSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={formData.skills.includes(skill)}
                  onCheckedChange={() => {
                    const newSkills = formData.skills.includes(skill)
                      ? formData.skills.filter((s: string) => s !== skill)
                      : [...formData.skills, skill];
                    setValue("skills", newSkills);
                  }}
                />
                <Label htmlFor={skill}>{skill}</Label>
              </div>
            ))}
          </div>
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills.message}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="customSkills">Custom Skills</Label>
            <Controller
              name="customSkills"
              control={control}
              render={({ field }) => (
                <Input
                  id="customSkills"
                  placeholder="Enter your custom skills, separated by commas"
                  {...field}
                  onBlur={(e) => {
                    const customSkills = e.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter((skill) => skill);
                    setValue("skills", [...formData.skills, ...customSkills]);
                  }}
                />
              )}
            />
            {errors.customSkills && (
              <p className="text-red-500 text-sm">
                {errors.customSkills.message}
              </p>
            )}
          </div>
          <div className="flex justify-start pt-10">
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;
