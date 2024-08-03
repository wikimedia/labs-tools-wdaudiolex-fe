import {create} from 'zustand';
import { Item } from '../src/utils/types';

type ItemState = {
  selectedItem: string;
  items: Item[];
  searchedItems: Item[];
  getSearchedItems: (data: string) => void;
  getSelectedItem: (selectedItem: string) => void;
  getItems: (items: Item[]) => void;
  removeEdittedItem: (id: string) => void;

};
 export const ItemStore = create<ItemState>((set) => ({
   selectedItem: "",
   searchedItems: [],
   items: [],
   getSearchedItems: (data: string) =>
     set((state) => ({ searchedItems: state.items.filter(item =>  (item.label.toLowerCase().includes(data.toLocaleLowerCase()))) })),
  getSelectedItem: (selectedItem: string) =>
     set({ selectedItem: selectedItem }),
   getItems: (items: Item[]) => set({ items: items }),
   removeEdittedItem: (id: string) =>
     set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
 }));

 