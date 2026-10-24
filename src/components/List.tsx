export interface Column {
  key: string;
  label: string;
}

export interface ListProps {
  columns: Column[];
  rows: Record<string, any>[];
  onRowClick?: (row: Record<string, any>) => void;
}

const List = ({ columns, rows, onRowClick }: ListProps) => {
  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/10 overflow-hidden shadow-[0_12px_30px_rgba(2,6,23,0.35)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-[#151c30]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left font-semibold text-[#c3c8d4] text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 align-middle">
                    {col.key.toLowerCase() === "imageurl" ? (
                      row[col.key] ? (
                        <img
                          src={row[col.key]}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover border border-white/10"
                        />
                      ) : (
                        <span className="text-[#5f6779]">—</span>
                      )
                    ) : row[col.key] ? (
                      <span className="text-white">{row[col.key]}</span>
                    ) : (
                      <span className="text-[#5f6779]">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <p className="text-center text-[#8b93a7] py-14 text-sm">
          No data available.
        </p>
      )}
    </div>
  );
};

export default List;