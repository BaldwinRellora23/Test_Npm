import { create } from "zustand";

interface INav {
  Title: string;
  setTitle: (Title: string) => void;
}

export const UseNavHeaderStore = create<INav>((set) => ({
  Title: "",
  setTitle: (title) => set({ Title: title }),
}));
