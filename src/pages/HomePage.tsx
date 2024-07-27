import React from "react";
import ItemCard from "../components/ItemCard";
import { Item } from "../components/ItemCard";


const items: Item[] = [
  {
    id: "1",
    label: "Wikipedia(Q52)",
    description: "Free online encyclopedia",
    imgUrl:
      "https://media.istockphoto.com/id/1779764918/de/foto/foto-von-niedlichen-entspannenden-m%C3%A4dchen-analyse-informationen-smm-manager-lesen-wikipedia.jpg?s=1024x1024&w=is&k=20&c=fSWSJFcfvqgXBVhd5Icco2ak_FVN6imW9yUaIzyYCHI=",
    totalFiles: "Over 6 million articles (English)",
    foundedDate: "January 15, 2001",
  },
  {
    id: "2",
    label: "Wikimedia Commons(Q565)",
    description: "Repository of free-use media files",
    imgUrl:
      "https://media.istockphoto.com/id/1827291486/de/foto/ein-engagierter-mentor-erkl%C3%A4rt-den-mentees-die-bedeutung-des-projekts-w%C3%A4hrend-er-in-der.jpg?s=1024x1024&w=is&k=20&c=6FRo_RVYe15OJTx_2tNpMJ3nQYmNpnLUQwubu23YEjs=",
    totalFiles: "Over 80 million",
    foundedDate: "September 7, 2004",
  },
  {
    id: "3",
    label: "Wikidata(Q2013)",
    description: "Free and open knowledge base",
    imgUrl:
      "https://media.istockphoto.com/id/1053318336/de/foto/business-meeting.jpg?s=1024x1024&w=is&k=20&c=JDuYN_9o7YEYIFXSYt1oITFL8LCs0rLtAX3gi9x-blQ=",
    totalFiles: "Over 100 million data items",
    foundedDate: "October 30, 2012",
  },
];

const HomePage = () => {
  return (
    <>
      <div >
        {items.map((item) => (
          <ItemCard
            id={item.id}
            totalFiles={item.totalFiles}
            foundedDate={item.foundedDate}
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
