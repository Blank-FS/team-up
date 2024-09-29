"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import { predefinedSkills } from "@/lib/mocks";
import { Timeline } from "../ui/timeline";
import { formSchema, experienceSchema } from "./zod/formSchema";

export default function OnboardingProcess() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      school: "",
      graduationYear: "",
      skills: [""],
      customSkills: "",
      experiences: [
        { title: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    },
  });

  const formData = watch();

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    toast({
      title: "Onboarding Complete",
      description: "Your information has been successfully submitted.",
    });
  };

  const validateStep = (step: number) => {
    const values = getValues();
    switch (step) {
      case 0:
        return values.name.trim() !== "";
      case 1:
        return values.school.trim() !== "";
      case 2:
        return values.graduationYear !== "";
      case 3:
        return values.skills.length > 0 || values.customSkills.trim() !== "";
      case 4:
        return values.experiences.some(
          (exp) => exp.title.trim() !== "" && exp.company.trim() !== ""
        );
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
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
                      {[...Array(6)].map((_, i) => (
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
                        ? formData.skills.filter((s) => s !== skill)
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
            {formData.experiences.map((exp, index) => (
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
                        (_, i) => i !== index
                      );
                      setValue("experiences", newExperiences);
                    }}
                    className="mt-2"
                  >
                    Remove Experience
                  </Button>
                )}
              </Card>
            ))}
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
                validateStep(currentStep)
                  ? ""
                  : "bg-muted text-muted-foreground"
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

  const timelineData = [
    {
      title: "Step 1",
      content: renderStepContent(0),
    },
    {
      title: "Step 2",
      content: renderStepContent(1),
    },
    {
      title: "Step 3",
      content: renderStepContent(2),
    },
    {
      title: "Step 4",
      content: renderStepContent(3),
    },
    {
      title: "Step 5",
      content: renderStepContent(4),
    },
  ];

  return (
    <div className="flex items-center justify-start w-screen min-h-screen">
      <Card className="w-[350px] sm:w-[450px] border-none">
        <CardHeader>
          <CardTitle>Update your information to team up!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Timeline data={timelineData} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
