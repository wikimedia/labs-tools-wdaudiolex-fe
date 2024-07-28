// items.ts
export interface Item {
  id: string;
  label: string;
  description: string;
  imgUrl: string;
  totalFiles: number;
  foundedDate: Date;
}

export const items: Item[] = [
  {
    id: "1",
    label: "Item 1",
    description: "Description for Item 1",
    imgUrl: "url_to_image_1",
    totalFiles: 10,
    foundedDate: new Date("2020-01-01"),
  },
  {
    id: "2",
    label: "Item 2",
    description: "Description for Item 2",
    imgUrl: "url_to_image_2",
    totalFiles: 5,
    foundedDate: new Date("2021-01-01"),
  },
  // Add more items as needed
];
