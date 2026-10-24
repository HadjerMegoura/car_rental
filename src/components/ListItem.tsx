// src/components/CarListItem.tsx
import type { Car } from "../types/Car";

interface ListItemProps {
  car: Car;
  onBook?: (carId: number) => void;
  onClick?: () => void;
}

function ListItem({ car, onBook, onClick }: ListItemProps) {
  return (
    <div
      className="flex items-center gap-4 bg-[#0d1424] rounded-xl border border-white/10 p-3 hover:shadow-[0_8px_20px_rgba(15,23,42,0.25)] transition-shadow"
      onClick={onClick}
    >
      <img
        src={car.imageUrl}
        alt={car.name}
        className="w-24 h-16 object-cover rounded-lg"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white truncate">
            {car.name}
          </h3>
          <span className="text-xs text-[#8b93a7]">{car.year}</span>
        </div>
        <p className="text-xs text-[#c3c8d4]">{car.brand}</p>
      </div>

      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium  ${
          car.available
            ? "bg-[#1a3c30] text-[#7ef0b8]"
            : "bg-[#3b2336] text-[#f1a0c3]"
        }`}
      >
        {car.available ? "Available" : "Booked"}
      </span>

      <div className="text-right w-20">
        <span className="text-sm font-bold text-white">
          ${car.pricePerDay}
        </span>
        <span className="text-xs text-[#8b93a7]">/day</span>
      </div>

      <button
        disabled={!car.available}
        onClick={() => onBook?.(car.id ?? 0)}
        className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
          car.available
            ? "bg-[#3b6ef5] text-white hover:bg-[#5580f7]"
            : "bg-white/5 text-[#5f6779] cursor-not-allowed"
        }`}
      >
        {car.available ? "Book" : "Unavailable"}
      </button>
    </div>
  );
}

export default ListItem;
