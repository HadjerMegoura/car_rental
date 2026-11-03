// src/pages/AddCar.tsx
import { useEffect, useState } from "react";
import { Car, Upload, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { Car as CarType } from "../types/Car";
import apiClient from "../api/client.api";
import { getErrorMessage } from "../api/getErrorMessage";
import { useToast } from "../contexts/ToastContext";

function CarDetails() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();

  const carDataObjectInitialization = {
    name: "",
    brand: "",
    year: new Date().getFullYear(),
    pricePerDay: 0,
    available: true,
    imageUrl: "",
  };
  const [carForm, setCarForm] = useState<CarType>(carDataObjectInitialization);

  useEffect(() => {
    if (id) {
      apiClient
        .get(`/api/cars/${id}`)
        .then((response) => {
          const carData = response.data;
          setCarForm(carData);
          setImagePreview(carData.imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching car details:", error);
          showToast(
            "error",
            getErrorMessage(error, "Failed to load car details."),
          );
        });
    } else {
      setCarForm(carDataObjectInitialization);
      setImagePreview(null);
    }
  }, [id, showToast]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCarForm({ ...carForm, imageUrl: imagePreview ?? "" });
    }
  }

  const handleAddCar = () => {
    const carObject = {
      name: carForm.name,
      brand: carForm.brand,
      year: carForm.year,
      pricePerDay: carForm.pricePerDay,
      available: carForm.available,
      imageUrl: carForm.imageUrl,
      id: carForm.id,
    };

    if (id && parseInt(id) !== 0) {
      apiClient
        .patch(`/api/cars`, carObject)
        .then((_response) => {
          navigate("/cars");
        })
        .catch((error) => {
          console.error("Error updating car:", error);
          showToast("error", getErrorMessage(error, "Failed to update car."));
        });
    } else {
      apiClient
        .post("/api/cars", carObject)
        .then((_response) => {
          navigate("/cars");
        })
        .catch((error) => {
          console.error("Error adding car:", error);
          showToast("error", getErrorMessage(error, "Failed to add car."));
        });
    }
  };

  const handleCancel = () => {
    navigate("/cars");
  };

  return (
    <div className="p-8 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-[#3b6ef5] flex items-center justify-center">
          <Car size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">
            {id ? "Edit Car Details" : "Add New Car"}
          </h1>
          <p className="text-sm text-[#8b93a7]">
            {id
              ? "Edit the details of your car"
              : "Add a new vehicle to your rental fleet"}
          </p>
        </div>
      </div>

      <div className="bg-[#0d1424] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-[#c3c8d4] mb-2">
              Car photo
            </label>

            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={imagePreview}
                  alt="Car preview"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0d1424]/80 text-white flex items-center justify-center hover:bg-[#0d1424] transition-colors">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 w-full h-48 rounded-xl border-2 border-dashed border-white/15 bg-[#151c30] cursor-pointer hover:border-[#3b6ef5] hover:bg-[#1c2438] transition-colors">
                <Upload size={22} className="text-[#8b93a7]" />
                <span className="text-sm text-[#c3c8d4]">
                  Click to upload an image
                </span>
                <span className="text-xs text-[#5f6779]">
                  PNG, JPG up to 5MB
                </span>
                <input
                  value={carForm.imageUrl}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Name + Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#c3c8d4] mb-1.5">
                Car name
              </label>
              <input
                type="text"
                value={carForm.name}
                onChange={(e) =>
                  setCarForm({ ...carForm, name: e.target.value })
                }
                placeholder="e.g. BMW 3 Series"
                className="w-full px-3.5 py-2.5 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white
                           placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#c3c8d4] mb-1.5">
                Brand
              </label>
              <input
                type="text"
                placeholder="e.g. BMW"
                value={carForm.brand}
                onChange={(e) =>
                  setCarForm({ ...carForm, brand: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white
                           placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent"
              />
            </div>
          </div>

          {/* Year + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#c3c8d4] mb-1.5">
                Year of construction
              </label>
              <input
                type="number"
                placeholder="2024"
                value={carForm.year}
                onChange={(e) =>
                  setCarForm({ ...carForm, year: parseInt(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white
                           placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#c3c8d4] mb-1.5">
                Price per day
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8b93a7]">
                  $
                </span>
                <input
                  type="number"
                  placeholder="65"
                  value={carForm.pricePerDay}
                  onChange={(e) =>
                    setCarForm({
                      ...carForm,
                      pricePerDay: parseFloat(e.target.value),
                    })
                  }
                  className="w-full pl-7 pr-3.5 py-2.5 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white
                             placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Availability toggle */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#151c30] border border-white/10 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">
                Available for rent
              </p>
              <p className="text-xs text-[#8b93a7]">
                Toggle off if this car is not ready yet
              </p>
            </div>
            <ToggleSwitch
              enabled={carForm.available}
              onToggle={(enabled) =>
                setCarForm({ ...carForm, available: enabled })
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-8 py-5 bg-[#151c30] border-t border-white/10">
          <button
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-[#c3c8d4] hover:bg-white/15 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCar}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#3b6ef5] text-white hover:bg-[#5580f7] transition-colors"
          >
            {id ? "Save Changes" : "Add Car"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? "bg-[#3b6ef5]" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default CarDetails;
