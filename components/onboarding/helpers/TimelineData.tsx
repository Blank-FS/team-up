import React from "react";
import StepContent from "./StepContent";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";

interface TimelineDataProps {
  currentStep: number;
  formData: any;
  setValue: (name: string, value: any) => void;
  validateStep: (step: number) => boolean;
  handleSubmit: (
    callback: (data: any) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: any) => void;
  errors: any;
}

const TimelineData: React.FC<TimelineDataProps> = ({
  currentStep,
  formData,
  setValue,
  validateStep,
  handleSubmit,
  onSubmit,
  errors,
}) => {
  const timelineData = [
    {
      title: "Step 1",
      content: (
        <StepContent
          step={0}
          formData={formData}
          setValue={setValue}
          validateStep={validateStep}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          currentStep={currentStep}
        />
      ),
    },
    {
      title: "Step 2",
      content: (
        <StepContent
          step={1}
          formData={formData}
          setValue={setValue}
          validateStep={validateStep}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          currentStep={currentStep}
        />
      ),
    },
    {
      title: "Step 3",
      content: (
        <StepContent
          step={2}
          formData={formData}
          setValue={setValue}
          validateStep={validateStep}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          currentStep={currentStep}
        />
      ),
    },
    {
      title: "Step 4",
      content: (
        <StepContent
          step={3}
          formData={formData}
          setValue={setValue}
          validateStep={validateStep}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          currentStep={currentStep}
        />
      ),
    },
    {
      title: "Step 5",
      content: (
        <StepContent
          step={4}
          formData={formData}
          setValue={setValue}
          validateStep={validateStep}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          currentStep={currentStep}
        />
      ),
    },
  ];

  return (
    <div className="no-scrollbar">
      <Timeline data={timelineData} />
    </div>
  );
};

export default TimelineData;
