
'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import type { Tour as TourConfig, TourStep } from './useTour';

type Position = 'top' | 'bottom' | 'left' | 'right';

interface TourProps {
  tour: TourConfig;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: TourStep | null;
  currentStepIndex: number;
  totalSteps: number;
}

interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
}

// Simple component to prevent clicks from passing through
const ClickShield = ({ onClick }: { onClick: () => void }) => (
  <div
    className="fixed inset-0 z-[100]"
    onClick={onClick}
  />
);

export const Tour = ({
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentStep,
  currentStepIndex,
  totalSteps,
}: TourProps) => {
  const [targetRect, setTargetRect] = useState<ElementRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResizeOrScroll = () => {
      if (isOpen && currentStep?.selector) {
        const element = document.querySelector(currentStep.selector);
        if (element) {
          setTargetRect(element.getBoundingClientRect());
        } else {
          setTargetRect(null);
        }
      }
    };

    if (isOpen) {
      handleResizeOrScroll();
      window.addEventListener('resize', handleResizeOrScroll);
      window.addEventListener('scroll', handleResizeOrScroll, true); // Use capture phase
    }

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll, true);
    };
  }, [isOpen, currentStep]);

  const spotlightStyle = useMemo(() => {
    if (!targetRect) {
      return { background: 'rgba(0, 0, 0, 0.5)' };
    }
    const x = targetRect.left + targetRect.width / 2;
    const y = targetRect.top + targetRect.height / 2;
    const radius = Math.max(targetRect.width, targetRect.height) / 2 + 10;

    return {
      background: `radial-gradient(circle at ${x}px ${y}px, transparent ${radius}px, rgba(0, 0, 0, 0.6) ${radius + 20}px)`,
    };
  }, [targetRect]);

  const calculatedPosition = useMemo((): Position => {
    if (!targetRect || !tooltipRef.current) return 'bottom';
    
    const desiredPosition = currentStep?.position || 'bottom';
    const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltipRef.current;
    const { top, bottom, left, right } = targetRect;
    const { innerWidth: vw, innerHeight: vh } = window;
    const margin = 15;

    const hasSpace = {
      top: top > tooltipHeight + margin,
      bottom: vh - bottom > tooltipHeight + margin,
      left: left > tooltipWidth + margin,
      right: vw - right > tooltipWidth + margin,
    };

    if (desiredPosition === 'top' && hasSpace.top) return 'top';
    if (desiredPosition === 'bottom' && hasSpace.bottom) return 'bottom';
    if (desiredPosition === 'left' && hasSpace.left) return 'left';
    if (desiredPosition === 'right' && hasSpace.right) return 'right';

    // If desired position is not available, find the best fit
    if (hasSpace.bottom) return 'bottom';
    if (hasSpace.top) return 'top';
    if (hasSpace.right) return 'right';
    if (hasSpace.left) return 'left';

    return 'bottom'; // Fallback
  }, [targetRect, currentStep?.position]);

  const tooltipStyle = useMemo(() => {
    if (!targetRect || !tooltipRef.current) return { opacity: 0 };
    
    const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltipRef.current;
    let top = 0, left = 0;
    const margin = 15;

    switch (calculatedPosition) {
      case 'top':
        top = targetRect.top - tooltipHeight - margin;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'right':
        left = targetRect.right + margin;
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        break;
      case 'left':
        left = targetRect.left - tooltipWidth - margin;
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        break;
      case 'bottom':
      default:
        top = targetRect.bottom + margin;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
    }

    // Clamp values to be within viewport
    top = Math.max(margin, Math.min(top, window.innerHeight - tooltipHeight - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - tooltipWidth - margin));

    return { top: `${top}px`, left: `${left}px` };
  }, [targetRect, calculatedPosition]);
  
  const arrowStyle = useMemo(() => {
    if (!targetRect || !tooltipRef.current) return {};
    
    const { left: tooltipLeft, top: tooltipTop } = tooltipRef.current.getBoundingClientRect();
    let style = {};

    switch (calculatedPosition) {
      case 'top':
        style = { top: '100%', left: `${targetRect.left - tooltipLeft + targetRect.width / 2}px`, transform: 'translateX(-50%) rotate(45deg)', borderTop: 'none', borderLeft: 'none' };
        break;
      case 'bottom':
        style = { top: '-9px', left: `${targetRect.left - tooltipLeft + targetRect.width / 2}px`, transform: 'translateX(-50%) rotate(45deg)', borderBottom: 'none', borderRight: 'none' };
        break;
      case 'left':
         style = { left: '100%', top: `${targetRect.top - tooltipTop + targetRect.height / 2}px`, transform: 'translateY(-50%) rotate(45deg)', borderTop: 'none', borderRight: 'none' };
        break;
      case 'right':
        style = { right: '100%', top: `${targetRect.top - tooltipTop + targetRect.height / 2}px`, transform: 'translateY(-50%) rotate(45deg)', borderBottom: 'none', borderLeft: 'none' };
        break;
    }
    return style;
  }, [targetRect, calculatedPosition]);

  if (!isOpen || !currentStep) return null;
  
  if (!currentStep.selector) {
    return (
      <>
        <ClickShield onClick={onClose} />
        <div ref={tooltipRef} className="fixed z-[102] bg-white rounded-xl shadow-2xl p-6 max-w-md transition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in-scale">
          <div className="text-xl font-bold text-deep-teal mb-3">{currentStep.title}</div>
          <p className="text-slate-700 leading-relaxed">{currentStep.content}</p>
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm font-semibold text-slate-500">{currentStepIndex > 0 ? `${currentStepIndex + 1} / ${totalSteps}`: ''}</span>
            <div className="flex items-center gap-3">
              {currentStepIndex > 0 && <button onClick={onPrev} className="px-4 py-2 text-sm bg-slate-200 font-bold rounded-lg hover:bg-slate-300 transition-colors">Previous</button>}
              <button onClick={onNext} className="px-5 py-2 text-base bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition-colors">{currentStepIndex === totalSteps - 1 ? 'Finish' : 'Next'}</button>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] transition-opacity duration-300" style={spotlightStyle} />
      <div ref={tooltipRef} className="fixed z-[102] bg-white rounded-xl shadow-2xl p-5 max-w-xs transition-all duration-300 border-2 border-deep-teal/50 animate-fade-in-scale" style={tooltipStyle}>
        <div className="absolute w-4 h-4 bg-white border-deep-teal/50" style={arrowStyle} />
        <div className="font-bold text-lg text-deep-teal mb-2">{currentStep.title}</div>
        <p className="text-slate-700 text-sm leading-relaxed">{currentStep.content}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs font-semibold text-slate-500">{currentStepIndex + 1} / {totalSteps}</span>
          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && <button onClick={onPrev} className="px-3 py-1 text-xs font-bold bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors">Prev</button>}
            <button onClick={onNext} className="px-4 py-1.5 text-sm font-bold bg-deep-teal text-white rounded-lg hover:bg-deep-teal/90 transition-colors">{currentStepIndex === totalSteps - 1 ? 'Finish' : 'Next'}</button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
      </div>
    </>
  );
};
