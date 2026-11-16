export const DEFAULT_CAR_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80";

export const getSafeImageUrl = (url?: string | null): string => {
  if (typeof url !== "string") {
    return DEFAULT_CAR_IMAGE;
  }

  const trimmed = url.trim();
  return trimmed.length > 0 ? trimmed : DEFAULT_CAR_IMAGE;
};
