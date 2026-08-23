import { TableColumn } from "../types/Table";

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  getRowKey: (item: T) => string;
  emptyMessage?: string;
}

export default function Table<T>({
  data,
  columns,
  getRowKey,
  emptyMessage = "No data found.",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse table-auto">
        <thead className={"rounded"}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left text-sm font-semibold bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 truncate ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={getRowKey(item)}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 ${column.className ?? ""}`}
                  >
                    {column.render ? column.render(item) : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
