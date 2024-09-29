"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TimelineData from "./helpers/TimelineData";
import { formSchema } from "./zod/formSchema";

export default function OnboardingProcess() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const methods = useForm({
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

  const {
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;
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

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-start w-screen min-h-screen">
        <Card className="w-[350px] sm:w-[450px] border-none">
          <CardHeader>
            <CardTitle>Update your information to team up!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TimelineData
                currentStep={currentStep}
                formData={formData}
                setValue={setValue as (name: string, value: any) => void}
                validateStep={validateStep}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
}
