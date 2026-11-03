import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Car as CarIcon, User } from "lucide-react";
import List, { type Column } from "../components/List";
import type { Client } from "../types/Client";
import useFetch from "../hooks/useFetch";
import apiClient from "../api/client.api";
import type { Car } from "../types/Car";
import { useToast } from "../contexts/ToastContext";
import { getErrorMessage } from "../api/getErrorMessage";

const BookingFlow = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [car, setCar] = useState<Car | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  const { data: clients } = useFetch<Client>("/api/clients");

  const [columns, setListColumns] = useState<Column[]>([]);
  const [rows, setListRows] = useState<Record<string, any>[]>([]);

  const [bookingForm, setBookingForm] = useState({
    carId: carId ?? 0,
    clientId: 0,
    startDate: "",
    endDate: "",
    price: 0,
  });

  // Create the clients list
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

  // Fetch car
  useEffect(() => {
    if (!carId) return;

    apiClient
      .get(`/api/cars/${carId}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch car:", error);
        showToast(
          "error",
          getErrorMessage(error, "Failed to load car details."),
        );
      });
  }, [carId, showToast]);

  // Update booking form when car is loaded
  useEffect(() => {
    if (!car) return;

    setBookingForm((prev) => ({
      ...prev,
      carId: car.id ?? 0,
      price: car.pricePerDay ?? 0,
    }));
  }, [car]);

  // Select client
  const selectClient = (row: Record<string, any>) => {
    const selectedClient = clients?.find((c) => c.id === row.id);

    setClient(selectedClient || null);

    if (selectedClient) {
      setBookingForm((prev) => ({
        ...prev,
        clientId: selectedClient.id ?? 0,
      }));
    }
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBookingForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  //re-calculate price
  useEffect(() => {
    if (!bookingForm.startDate || !bookingForm.endDate || !car) {
      return;
    }

    const start = new Date(bookingForm.startDate);
    const end = new Date(bookingForm.endDate);

    const durationMs = end.getTime() - start.getTime();
    const durationDays = durationMs / (1000 * 60 * 60 * 24);

    if (durationDays <= 0) {
      setBookingForm((prev) => ({
        ...prev,
        price: 0,
      }));
      return;
    }

    const price = durationDays * car.pricePerDay;

    setBookingForm((prev) => ({
      ...prev,
      price,
    }));
  }, [bookingForm.startDate, bookingForm.endDate, car]);

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await apiClient.post("/api/booking", bookingForm);
      showToast("success", "Booking created successfully.");
      navigate("/bookings");
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to create booking.");
      showToast("error", errorMessage);
    }
  };

  return (
    <div className="p-8">
      {/* Clients List */}
      {!client && (
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] mb-1">
            Select a client
          </h1>
          <p className="text-sm text-[#475569] mb-6">
            Booking: {car?.name ?? "Loading car..."}
          </p>
          <List columns={columns} rows={rows} onRowClick={selectClient} />
        </div>
      )}

      {/* Booking form */}
      {client && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto space-y-6 rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
        >
          <div>
            <h2 className="text-xl font-bold text-[#0f172a]">Create Rental</h2>
            <p className="mt-1 text-sm text-[#475569]">
              Enter the rental details below.
            </p>
          </div>

          {/* Car Name */}
          <div>
            <label
              htmlFor="carName"
              className="mb-2 flex items-center gap-1.5 text-sm font-medium text-[#334155]"
            >
              <CarIcon size={14} /> Car Name
            </label>

            <input
              id="carName"
              value={car?.name ?? ""}
              readOnly
              type="text"
              className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#0f172a] outline-none"
            />
          </div>

          {/* Client Name */}
          <div>
            <label
              htmlFor="clientName"
              className="mb-2 flex items-center gap-1.5 text-sm font-medium text-[#334155]"
            >
              <User size={14} /> Client Name
            </label>

            <input
              id="clientName"
              value={client ? `${client.firstname} ${client.lastname}` : ""}
              readOnly
              type="text"
              className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#0f172a] outline-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Start */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium text-[#334155]"
              >
                Start Date & Time
              </label>

              <input
                id="startDate"
                name="startDate"
                value={bookingForm.startDate}
                onChange={handleChange}
                type="datetime-local"
                required
                className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#3b6ef5] focus:ring-2 focus:ring-[#3b6ef5]/30"
              />
            </div>

            {/* End */}
            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium text-[#334155]"
              >
                End Date & Time
              </label>

              <input
                id="endDate"
                name="endDate"
                value={bookingForm.endDate}
                onChange={handleChange}
                type="datetime-local"
                required
                className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#3b6ef5] focus:ring-2 focus:ring-[#3b6ef5]/30"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-[#334155]"
            >
              Price
            </label>

            <div className="relative">
              <input
                id="price"
                name="price"
                value={bookingForm.price}
                onChange={handleChange}
                type="number"
                min="0"
                required
                readOnly
                className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2.5 pr-14 text-sm text-[#0f172a] outline-none transition focus:border-[#3b6ef5] focus:ring-2 focus:ring-[#3b6ef5]/30"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748b]">
                €
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#3b6ef5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5580f7] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:ring-offset-2 focus:ring-offset-[#0d1424]"
          >
            Create Rental
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingFlow;
