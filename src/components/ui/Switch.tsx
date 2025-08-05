'use client';

import React, { PropsWithChildren } from 'react';
import { cn } from '@/utils/utils';

interface SwitchProps {
  isActive: boolean;
  onToggle: () => void;
  className?: string;
}

export const Switch: React.FC<PropsWithChildren<SwitchProps>> = ({
  isActive,
  onToggle,
  className = '',
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      onClick={onToggle}
      className={cn(
        'w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none',
        isActive ? 'bg-blue-500' : 'bg-gray-300',
        className
      )}
    >
      <span
        className={cn(
          'w-4 h-4 bg-white rounded-full shadow-md transform transition-transform',
          isActive ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
};

Switch.displayName = 'Switch';
