/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { SearchUserSchema, searchUserSchemaResolver } from '@/schemas/searchUserSchema';

import Button from '@/components/ui/Button';
import Table, { Column } from '@/components/ui/Table';
import { useEffect, useState } from 'react';
import { UserSearchForm } from '@/components/forms/UserSearchForm';
import { PageHeader } from '@/components/PageHeader';
import { UserRegistrationModal } from '@/components/UserRegistrationModal';
import { UserDetailsModal } from '../../components/UserDetailsModal';

const customers = [
  {
    code: '001',
    name: 'Jane Cooper',
    nickname: 'Janey',
    email: 'jane@microsoft.com',
    status: 'Active',
  },
];

const columns: Column<(typeof customers)[number] & { actions?: unknown }>[] = [
  { label: 'Código', accessor: 'code' },
  { label: 'Nome', accessor: 'name' },
  { label: 'Apelido', accessor: 'nickname' },
  { label: 'Email', accessor: 'email' },
  {
    label: 'Status',
    accessor: 'status',
    render: (value: string) => (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-md border ${
          value === 'Active'
            ? 'text-green-700 bg-green-100 border-green-400'
            : 'text-red-600 bg-red-100 border-red-400'
        }`}
      >
        {value}
      </span>
    ),
  },
];

export default function UserPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchUserSchema>({
    resolver: searchUserSchemaResolver,
    defaultValues: {
      query: '',
      onlyName: false,
      onlyEmail: false,
    },
  });

  function handleSearch(data: SearchUserSchema) {
    console.log('🔍 Dados pesquisados:', data);
  }

  useEffect(() => {}, [page]);

  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailsModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-white shadow-2xl rounded-2xl p-6">
          <PageHeader title="Usuários" subtitle="Todos os usuários cadastrados" />

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-end">
            <UserSearchForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={handleSearch}
            />

            <Button
              type="button"
              className="h-11 bg-primary text-white font-bold hover:bg-primary-hover transition-colors px-6 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              Novo Usuário
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-6 mt-10">
          <Table
            columns={columns}
            data={customers}
            page={page}
            pageSize={5}
            total={customers.length}
            onPageChange={(newPage) => setPage(newPage)}
            onClickViewDetails={(user) => openModal(user)}
            hasViewer
            hasEdit
            hasDeleted
          />
        </div>
      </div>

      <UserRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {selectedUser && (
        <UserDetailsModal
          isOpen={isUserDetailsModalOpen}
          onClose={() => setIsUserDetailsModalOpen(false)}
          user={selectedUser}
        />
      )}
    </main>
  );
}
