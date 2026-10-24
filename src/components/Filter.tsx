import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface FieldOption {
  value: string;
  label: string;
}

interface FilterField {
  fieldLabel: string;
  options: FieldOption[];
}

interface FilterProps {
  placeholder?: string;
  fields?: FilterField[];
  onFilterChange: (filters: Record<string, string>) => void;
}

const Filter = ({ placeholder, fields, onFilterChange }: FilterProps) => {
  const [search, setSearch] = useState("");
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {},
  );

  function emitChange(next: Record<string, string>) {
    onFilterChange({ search, ...next });
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    onFilterChange({ ...selectedValues, search: value });
  }

  function handleSelectChange(fieldLabel: string, value: string) {
    const updated = { ...selectedValues, [fieldLabel]: value };
    setSelectedValues(updated);
    emitChange(updated);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <SlidersHorizontal
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b93a7]"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={placeholder || "Filter by model..."}
          className="w-full pl-10 pr-4 py-2.5 bg-[#151c30] border border-white/10 rounded-xl text-sm text-white
                     placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent"
        />
      </div>

      {fields?.map((field) => (
        <select
          key={field.fieldLabel}
          value={selectedValues[field.fieldLabel] ?? ""}
          onChange={(e) => handleSelectChange(field.fieldLabel, e.target.value)}
          className="px-3.5 py-2.5 bg-[#151c30] border border-white/10 rounded-xl text-sm text-[#c3c8d4] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5]"
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default Filter;