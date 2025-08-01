'use client';

import React from 'react';
import { Switch } from './ui/Switch';
import { CheckCircle2, XCircle } from 'lucide-react';

interface UserStatusSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
}

export const UserStatusSwitch: React.FC<UserStatusSwitchProps> = ({
  isActive,
  onToggle,
  className = '',
}) => {
  return (
    <div className={`flex items-center  gap-2 w-full ${className}`}>
      <span className="text-sm font-bold text-gray-800">
        {isActive ? 'Desativar Usuário' : 'Ativar Usuário'}
      </span>

      <div className="flex items-center gap-2">
        <Switch isActive={isActive} onToggle={onToggle} className="w-11 h-6" />

        <span
          className={`text-xs px-2 py-2 rounded-full font-medium ${
            isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {!isActive ? (
            <div className="flex items-center">
              <CheckCircle2 className="w-6 h-5 mr-1" color="green" />
              <span>Usuário Ativado</span>
            </div>
          ) : (
            <div className="flex items-center">
              <XCircle className="w-5 h-5 mr-1" color="red" />
              <span>Usuário Desativado</span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
