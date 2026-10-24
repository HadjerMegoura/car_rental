import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import type { Column } from "../components/List";
import Loading from "../components/Loading";
import List from "../components/List";
import Error from "../components/Error";

const BookingsList = () => {
  const { data: bookingsList, loading, error } = useFetch<any>("/api/booking");
  const [columns, setListColumns] = useState<Column[]>([]);
  const [rows, setListRows] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (!bookingsList || bookingsList.length === 0) return;

    const columns = Object.keys(bookingsList[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
    const rows = bookingsList.map((client) => ({ ...client }));

    setListColumns(columns);
    setListRows(rows);
  }, [bookingsList]);

  return (
    <>
      {loading && <Loading label="loading clients..." />}
      {error && (
        <Error
          message="Failed to load clients."
          onRetry={() => window.location.reload()}
        />
      )}
      {bookingsList && bookingsList.length > 0 && (
        <div className="p-6">
          <h1 className="text-xl font-semibold text-white mb-6">
            Bookings List
          </h1>
          <List columns={columns} rows={rows} />
        </div>
      )}
    </>
  );
};

export default BookingsList;
