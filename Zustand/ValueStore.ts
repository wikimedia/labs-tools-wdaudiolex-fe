import { create } from "zustand";
import { Values } from "../src/utils/types";

type ValueState = {
  selectedValue: string;
  values: Values[];
  getValues: (data: Values[]) => void;
  getSelectedValue: (data: string) => void;
};

export const ValueStore = create<ValueState>((set) => ({
    selectedValue: "",
    values: [],
    getValues: (data) => set({ values: data }),
    getSelectedValue: (data: string) => set({ selectedValue: data }),
  }));
