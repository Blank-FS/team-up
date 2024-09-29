import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
        </div>
      );
    case 1:
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
    case 2:
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Controller
              name="graduationYear"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(6)].map((_: undefined, i: number) => (
                      <SelectItem
                        key={i}
                        value={(new Date().getFullYear() + i).toString()}
                      >
                        {new Date().getFullYear() + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-sm">
                {errors.graduationYear.message}
              </p>
            )}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4">
          <Label>Skills (Select at least one or add custom skills)</Label>
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
          <div className="space-y-2">
            <Label htmlFor="customSkills">Custom Skills</Label>
            <Controller
              name="customSkills"
              control={control}
              render={({ field }) => (
                <Input
                  id="customSkills"
                  placeholder="Enter custom skills (comma-separated)"
                  {...field}
                />
              )}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-4">
          {formData.experiences.map(
            (
              exp: {
                title: string;
                company: string;
                startDate: string;
                endDate: string;
                description: string;
              },
              index: number
            ) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Job Title</Label>
                  <Controller
                    name={`experiences.${index}.title`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={`title-${index}`}
                        placeholder="e.g. Software Engineer"
                        {...field}
                      />
                    )}
                  />
                  {errors.experiences?.[index]?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.experiences[index].title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Controller
                    name={`experiences.${index}.company`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={`company-${index}`}
                        placeholder="e.g. Tech Corp"
                        {...field}
                      />
                    )}
                  />
                  {errors.experiences?.[index]?.company && (
                    <p className="text-red-500 text-sm">
                      {errors.experiences[index].company.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Controller
                      name={`experiences.${index}.startDate`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          id={`startDate-${index}`}
                          type="date"
                          {...field}
                        />
                      )}
                    />
                    {errors.experiences?.[index]?.startDate && (
                      <p className="text-red-500 text-sm">
                        {errors.experiences[index].startDate.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Controller
                      name={`experiences.${index}.endDate`}
                      control={control}
                      render={({ field }) => (
                        <Input id={`endDate-${index}`} type="date" {...field} />
                      )}
                    />
                    {errors.experiences?.[index]?.endDate && (
                      <p className="text-red-500 text-sm">
                        {errors.experiences[index].endDate.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Controller
                    name={`experiences.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id={`description-${index}`}
                        placeholder="Describe your role and responsibilities"
                        {...field}
                      />
                    )}
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newExperiences = formData.experiences.filter(
                        (_: any, i: number) => i !== index
                      );
                      setValue("experiences", newExperiences);
                    }}
                    className="mt-2"
                  >
                    Remove Experience
                  </Button>
                )}
              </Card>
            )
          )}
          <Button
            type="button"
            onClick={() => {
              const newExperiences = [
                ...formData.experiences,
                {
                  title: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                },
              ];
              setValue("experiences", newExperiences);
            }}
            className="w-full"
          >
            Add Another Experience
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={`ml-auto ${
              validateStep(currentStep) ? "" : "bg-muted text-muted-foreground"
            }`}
            disabled={!validateStep(currentStep)}
          >
            Submit
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;
