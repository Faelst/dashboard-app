import React from 'react';
import { cn } from '@/utils/utils';

interface HRProps {
  className?: string;
}

export const HR: React.FC<HRProps> = ({ className }) => {
  return <hr className={cn('my-4 border-gray-200', className)} />;
};
