import { useState } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";
import CardItem from "../components/CardItem";
import ListItem from "../components/ListItem";
import Filter from "../components/Filter";
import useFetch from "../hooks/useFetch";
import type { Car } from "../types/Car";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";

const CarsList = () => {
  const navigate = useNavigate();
  const [carsUrl, setUrl] = useState("/api/cars");
  const [view, setView] = useState<"list" | "grid">("grid"); // grid is default

  const {
    data: cars,
    loading,
    error,
    emptyResponse: emptyList,
  } = useFetch<Car>(carsUrl);

  const brandsList = [
    { value: "", label: "All Brands" },
    { value: "Toyota", label: "Toyota" },
    { value: "Honda", label: "Honda" },
    { value: "Ford", label: "Ford" },
    { value: "Chevrolet", label: "Chevrolet" },
    { value: "BMW", label: "BMW" },
  ];

  const yearsList = [
    { value: "", label: "All Years" },
    ...Array.from({ length: 2024 - 1990 + 1 }, (_, i) => {
      const year = 1990 + i;
      return { value: year.toString(), label: year.toString() };
    }),
  ];

  const fields = [
    { fieldLabel: "brand", options: brandsList },
    {
      fieldLabel: "available",
      options: [
        { value: "", label: "All Statuses" },
        { value: "true", label: "Available" },
        { value: "false", label: "Not Available" },
      ],
    },
    { fieldLabel: "year", options: yearsList },
  ];

  const handleSearchChange = (filters: Record<string, string>) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    if (Object.keys(filters).length === 0) {
      setUrl("/api/cars");
      return;
    }

    const query = params.toString();
    setUrl(`/api/cars/search${query ? `?${query}` : ""}`);
  };

  const handleBook = (carId: number) => {
    // Navigate to the BookingFlow page for the selected car
    navigate(`/booking/${carId}`);
  };

  const handleAddCarClick = () => {
    navigate("/add-car");
  };

  const handleCarClick = (carId: number) => {
    // Navigate to the CarDetails page for the clicked car
    navigate(`/car-details/${carId}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Filter
          placeholder="search by name,brand..."
          fields={fields}
          onFilterChange={handleSearchChange}
        />

        <div className="flex items-center gap-3">
          {/* Status badge */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151c30] border border-white/10">
            <span className="w-4 h-4 rounded-full bg-[#1a3c30] flex items-center justify-center flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="text-sm font-medium text-[#c3c8d4] whitespace-nowrap">
              {cars.length} cars available
            </span>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-[#151c30] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                view === "list"
                  ? "bg-[#3b6ef5] text-white"
                  : "text-[#5f6779] hover:text-[#c3c8d4]"
              }`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                view === "grid"
                  ? "bg-[#3b6ef5] text-white"
                  : "text-[#5f6779] hover:text-[#c3c8d4]"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          {/* Add car */}
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#3b6ef5] text-white hover:bg-[#5580f7] transition-colors cursor-pointer"
            onClick={handleAddCarClick}
          >
            <Plus size={16} />
            Add car
          </button>
        </div>
      </div>

      {loading && <Loading label="loading cars..." />}
      {error && (
        <Error
          message="Failed to load cars."
          onRetry={() => window.location.reload()}
        />
      )}
      {emptyList && (
        <p className="text-center text-gray-500">No cars available.</p>
      )}

      {!loading &&
        !error &&
        !emptyList &&
        (view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car: Car) => (
              <CardItem
                key={car.id}
                car={car}
                onBook={handleBook}
                onClick={() => handleCarClick(car.id ?? 0)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cars.map((car: Car) => (
              <ListItem
                key={car.id}
                car={car}
                onBook={handleBook}
                onClick={() => handleCarClick(car.id ?? 0)}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default CarsList;
