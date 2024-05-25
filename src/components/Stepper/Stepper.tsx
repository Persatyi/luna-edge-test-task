import React from 'react';

interface IStepperProps {
  totalSteps: number;
  currentStep: number;
}

const Stepper: React.FC<IStepperProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={`flex items-center justify-center w-4 h-4 rounded-full  ${
            index === currentStep ? 'bg-blue text-white' : 'bg-gray-light'
          }`}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
};

export default Stepper;
