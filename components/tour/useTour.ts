
import { useState, useMemo } from 'react';

export interface TourStep {
  selector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface Tour {
  id: string;
  steps: TourStep[];
}

export const useTour = (tour: Tour) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const start = () => {
    setIsActive(true);
    setCurrentStepIndex(0);
  };

  const stop = () => {
    setIsActive(false);
  };

  const next = () => {
    if (currentStepIndex < tour.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      stop();
    }
  };

  const previous = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = useMemo(() => {
    return isActive ? tour.steps[currentStepIndex] : null;
  }, [isActive, currentStepIndex, tour.steps]);

  const totalSteps = useMemo(() => tour.steps.length, [tour.steps]);

  return {
    start,
    stop,
    next,
    previous,
    currentStep,
    currentStepIndex,
    totalSteps,
    isActive,
  };
};
