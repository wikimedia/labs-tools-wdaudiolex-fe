import { create } from "zustand";
import { Item } from "../src/utils/types";

type ItemState = {
  selectedItem: Item | null;
  items: Item[];
  searchedItems: Item[];
  getSearchedItems: (data: string) => void;
  getSelectedItem: (id: string) => void;
  getItems: (items: Item[]) => void;
  removeEdittedItem: (id: string) => void;
};
export const ItemStore = create<ItemState>((set) => ({
  selectedItem: null,
  searchedItems: [],
  items: [],
  getSearchedItems: (data: string) =>
    set((state) => ({
      searchedItems: state.items.filter((item) =>
        item.label.toLowerCase().includes(data.toLocaleLowerCase())
      ),
    })),
  getSelectedItem: (id: string) =>
    set((state) => ({
      selectedItem: state.items.find((item) => item.id === id),
    })),
  getItems: (items: Item[]) => set({ items: items }),
  removeEdittedItem: (id: string) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));
