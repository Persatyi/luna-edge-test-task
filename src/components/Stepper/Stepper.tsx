import s from "./Steper.module.css";

import React from "react";

import { IQuestion } from "../../components/QuizForm/QuizForm";

interface IStepperProps {
  totalSteps: number;
  currentStep: number;
}

const Stepper: React.FC<IStepperProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className={s.stepper}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={`${s.step} ${index === currentStep ? s.current : ""}`}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
};

export default Stepper;
