'use client';

import { useState, useRef, useEffect } from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { SearchUserSchema } from '../../schemas/searchUserSchema';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FiFilter } from 'react-icons/fi';

interface UserSearchFormProps {
  onSubmit: (data: SearchUserSchema) => void;
  register: UseFormRegister<SearchUserSchema>;
  errors: FieldErrors<SearchUserSchema>;
  handleSubmit: UseFormHandleSubmit<SearchUserSchema>;
}

export function UserSearchForm({ onSubmit, register, errors, handleSubmit }: UserSearchFormProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-end relative"
    >
      <Input
        label="Pesquisar"
        type="text"
        id="query"
        registration={register('query')}
        placeholder="Cliente, fornecedor ou transportadora"
        className="w-full md:w-80"
        error={errors.query}
      />

      {/* Botão + Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
          className="h-11 px-4 border border-gray-400 rounded-md text-gray-800 flex items-center gap-2"
        >
          <FiFilter className="text-lg" />
          Filtro
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10 p-4 space-y-3">
            <h3 className="font-medium text-sm text-gray-700">Opções de Filtro</h3>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-800">Apenas nome</label>
              <input type="checkbox" {...register('onlyName')} />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-800">Apenas email</label>
              <input type="checkbox" {...register('onlyEmail')} />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-blue-400 text-white text-sm p-2 rounded-md"
              >
                Aplicar
              </Button>
              <Button
                type="button"
                className="w-full bg-red-300 hover:bg-red-400 text-white text-sm p-2 rounded-md"
                onClick={() => setShowDropdown(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
