import { useEffect, useState } from "react";
import List, { type Column } from "../components/List";
import useFetch from "../hooks/useFetch";
import type { Client } from "../types/Client";
import Loading from "../components/Loading";
import Error from "../components/Error";

const ClientsList = () => {
  const { data: clients, loading, error } = useFetch<Client>("/api/clients");
  const [columns, setListColumns] = useState<Column[]>([]);
  const [rows, setListRows] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (!clients || clients.length === 0) return;

    const columns = Object.keys(clients[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
    const rows = clients.map((client) => ({ ...client }));

    setListColumns(columns);
    setListRows(rows);
  }, [clients]);

  return (
    <>
      {loading && <Loading label="loading clients..." />}
      {error && (
        <Error
          message="Failed to load clients."
          onRetry={() => window.location.reload()}
        />
      )}
      {clients && clients.length > 0 && (
        <div className="p-6">
          <h1 className="text-xl font-semibold text-[#12181f] mb-6">
            Clients List
          </h1>
          <List columns={columns} rows={rows} onRowClick={(_client) => {}} />
        </div>
      )}
    </>
  );
};

export default ClientsList;
