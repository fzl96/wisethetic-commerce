import { create } from "zustand";

interface StudioPreviewState {
  bannerPreview: string | null;
  imagePreview: string | null;
  setBannerPreview: (url: string | null) => void;
  setImagePreview: (url: string | null) => void;
}

export const useStudioPreview = create<StudioPreviewState>((set) => ({
  bannerPreview: null,
  imagePreview: null,
  setBannerPreview: (url) => set({ bannerPreview: url }),
  setImagePreview: (url) => set({ imagePreview: url }),
}));
