import {create} from 'zustand'
import { Properties } from '../src/utils/types'

type PropertyState = {
  selectedProperty: string;
  properties: Properties[];
  getSelectedProperty: (data: string) => void;
  getProperties: (data: Properties[]) => void;
};

export const PropertyStore = create<PropertyState>((set) => ({
    selectedProperty:'',
    properties: [],
    getSelectedProperty: (data: string) => set({selectedProperty: data}),
    getProperties: (data) => set({properties: data})
}));