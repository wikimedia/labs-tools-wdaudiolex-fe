import React from "react";
import ItemCard from "../components/ItemCard";
import { Item } from "../components/ItemCard";

const items: Item[] = [
  {
    label: "bag(Q1234)",
    description: "bag description",
    imgUrl:
      "https://media.istockphoto.com/id/1779764918/de/foto/foto-von-niedlichen-entspannenden-m%C3%A4dchen-analyse-informationen-smm-manager-lesen-wikipedia.jpg?s=1024x1024&w=is&k=20&c=fSWSJFcfvqgXBVhd5Icco2ak_FVN6imW9yUaIzyYCHI=",
  },
//   {
//     label: "bag(Q5678)",
//     description: "bag description",
//     imgUrl:
//       "https://media.istockphoto.com/id/1827291486/de/foto/ein-engagierter-mentor-erkl%C3%A4rt-den-mentees-die-bedeutung-des-projekts-w%C3%A4hrend-er-in-der.jpg?s=1024x1024&w=is&k=20&c=6FRo_RVYe15OJTx_2tNpMJ3nQYmNpnLUQwubu23YEjs=",
//   },
//   {
//     label: "bag(Q9101)",
//     description: "bag description",
//     imgUrl:
//       "https://media.istockphoto.com/id/1053318336/de/foto/business-meeting.jpg?s=1024x1024&w=is&k=20&c=JDuYN_9o7YEYIFXSYt1oITFL8LCs0rLtAX3gi9x-blQ=",
//   },
];

const HomePage = () => {
  return (
    <>
      <div>
        {items.map((item) => (
          <ItemCard
            imgUrl={item.imgUrl}
            label={item.label}
            description={item.description}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
