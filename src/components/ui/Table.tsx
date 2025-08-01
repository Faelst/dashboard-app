/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit, Eye, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

export type Column<T> = {
  label: string;
  accessor: keyof T & { actions?: unknown };
  render?: (value: any, row: T) => ReactNode;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  hasViewer?: boolean;
  hasEdit?: boolean;
  hasDeleted?: boolean;
  onClickViewDetails?: (row: T) => void;
  onClickEdit?: (row: T) => void;
};

function Table<T extends object>({
  columns,
  data,
  page,
  total,
  pageSize = 5,
  onPageChange,
  hasViewer = false,
  hasEdit = false,
  hasDeleted = false,
  onClickViewDetails,
}: GenericTableProps<T>) {
  const totalPages = Math.ceil(total / pageSize);

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const startIndex = (page - 1) * pageSize;

  return (
    <>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-200">
            {columns.map((col, idx) => (
              <th key={idx} className="pb-3 px-4 capitalize text-center">
                {col.label}
              </th>
            ))}

            {(hasViewer || hasEdit || hasDeleted) && (
              <th className="pb-3 px-4 capitalize text-center">Ações</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-4 px-4 text-gray-800 text-center">
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : String(row[col.accessor] ?? '')}
                </td>
              ))}

              {/* Renderizar a coluna de actions no final automaticamente */}
              {(hasViewer || hasEdit || hasDeleted) && (
                <td className="py-4 px-4 text-gray-800 text-center">
                  <div className="flex justify-center gap-2">
                    {hasViewer && (
                      <button
                        onClick={() => {
                          if (onClickViewDetails) {
                            onClickViewDetails(row);
                          }
                        }}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                    {hasEdit && (
                      <button
                        onClick={() => console.log('Editar', row)}
                        className="text-yellow-500 hover:text-yellow-700 transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                    {hasDeleted && (
                      <button
                        onClick={() => console.log('Excluir', row)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400 gap-4">
        <span>
          Exibindo {startIndex + 1} - {Math.min(startIndex + data.length, total)} de {total}{' '}
          registros
        </span>

        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
