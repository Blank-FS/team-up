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
      first_name: "",
      last_name: "",
      role: "",
      bio: "",
      school: "",
      skills: [],
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

  const onSubmit = async (data: any) => {
    if (validateStep(currentStep)) {
      try {
        const response = await fetch("/api/submit-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast({
            title: "Onboarding Complete",
            description: "Your information has been successfully submitted.",
          });
        } else {
          toast({
            title: "Submission Error",
            description: "There was an error submitting your information.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Submission Error",
          description: "There was an error submitting your information.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill out the required fields.",
        variant: "destructive",
      });
    }
  };

  const validateStep = (step: number) => {
    const values = getValues();
    switch (step) {
      case 0:
        return (
          values.first_name.trim() !== "" && values.last_name.trim() !== ""
        );
      case 1:
        return values.role.trim() !== "";
      case 2:
        return values.bio.trim() !== "";
      case 3:
        return values.school.trim() !== "";
      case 4:
        return values.skills.length > 0;
      default:
        return false;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-start w-full min-h-screen no-scrollbar">
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
