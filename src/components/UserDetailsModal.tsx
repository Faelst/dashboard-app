import React from 'react';
import { Dialog } from '@headlessui/react';
import Button from './ui/Button';
import { UserStatusSwitch } from './UserStatusSwitch';
import { HR } from './ui/Hr';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    code: string;
    name: string;
    surname: string;
    email: string;
  };
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <Dialog.Title className="text-xl font-bold mb-4">
          {user.name} {user.surname}
        </Dialog.Title>

        <UserStatusSwitch
          isActive={true}
          onToggle={() => {
            // Handle toggle logic here
          }}
        />

        <HR className="my-3" />

        <div className="space-y-5 text-md text-gray-700">
          <div className="flex flex-col gap-2">
            <strong>Código:</strong>
            <p className="text-gray-400">{user.code}</p>
          </div>
          <div className="flex flex-col gap-2">
            <strong>Nome:</strong>
            <p className="text-gray-400">Apelido: {user.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <strong>Sobrenome:</strong> {user.surname}
            <p className="text-gray-400">Sobrenome: {user.surname}</p>
          </div>
          <div className="flex flex-col gap-2">
            <strong>Email:</strong> {user.email}
            <p className="text-gray-400">Email: {user.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <strong>Permissões:</strong>
            <p className="text-gray-400">Editar Cliente</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-between mt-6">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium">
            Editar
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-medium"
          >
            Voltar
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
