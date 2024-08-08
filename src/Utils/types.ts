export interface Item {
  id: string;
  label: string;
  description: string;
  imgUrl: string;
  totalFiles: string;
  foundedDate: string;
  property?: string;
  value?: string;
}

export interface Properties {
    label: string;
    value: string
}
export interface Values {
  label: string;
  value: string;
}