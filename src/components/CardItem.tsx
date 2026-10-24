import { Fuel, Gauge } from "lucide-react";
import type { Car } from "../types/Car";

interface CardItemProps {
  car: Car;
  onBook?: (carId: number) => void;
  onClick?: () => void;
}

const CardItem = ({ car, onBook, onClick }: CardItemProps) => {
  return (
    <div
      className="bg-[#0d1424] rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(2,6,23,0.45)] border border-white/10 hover:border-[#3b6ef5]/40 transition-colors"
      onDoubleClick={onClick}
    >
      {/* Image + availability badge + tags */}
      <div className="relative h-52 bg-[#151c30]">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-full object-cover"
        />

        <span
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
            car.available
              ? "bg-[#1c3a2e]/90 text-[#4ade80]"
              : "bg-[#2a2035]/90 text-[#c3a8ff]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              car.available ? "bg-[#4ade80]" : "bg-[#c3a8ff]"
            }`}
          />
          {car.available ? "Available" : "Booked"}
        </span>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
            {car.brand}
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
            {car.year}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold text-white">{car.name}</h3>
          <div className="text-right flex-shrink-0">
            <span className="text-xl font-bold text-white">
              ${car.pricePerDay}
            </span>
            <span className="text-sm text-[#8b93a7]"> /day</span>
          </div>
        </div>

        <p className="text-xs font-mono text-[#8b93a7] mb-4">
          {car.brand} · {car.year}
        </p>

        {/* Quick specs row */}
        <div className="flex items-center gap-4 text-[#c3c8d4] text-sm mb-5 pb-5 border-b border-white/10">
          <span className="flex items-center gap-1.5">
            <Fuel size={15} /> Petrol
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge size={15} /> Auto
          </span>
        </div>

        {/* CTA */}
        <button
          disabled={!car.available}
          onClick={() => onBook?.(car.id ?? 0)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            car.available
              ? "bg-[#3b6ef5] text-white hover:bg-[#5580f7]"
              : "bg-white/5 text-[#5f6779] cursor-not-allowed"
          }`}
        >
          {car.available ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default CardItem;