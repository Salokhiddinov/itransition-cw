import { useEffect, useState } from "react";
import Collection from "../components/Collection";
import axios from "../plugins/axios";
import { useParams } from "react-router-dom";
import Item from "../components/Item";

export default function CollectionItems() {
  let { collectionID } = useParams();
  const [collection, setCollection] = useState([]);
  const [items, setItems] = useState([]);
  const [refreshRate, setRefreshRate] = useState(0);

  setInterval(() => {
    setRefreshRate(refreshRate + 1);
  }, 5000);

  useEffect(() => {
    async function getCollection() {
      const res = await axios.get(`collection/${collectionID}`);
      setCollection(res.data);
    }
    async function getItems() {
      const res = await axios.get(`items/${collectionID}`);
      const reversedItems = res.data.reverse();
      setItems(reversedItems);
    }
    getCollection();
    getItems();
    // eslint-disable-next-line
  }, [refreshRate]);

  return (
    <>
      <Collection collection={collection} />
      {items.map((item) => {
        return <Item item={item} key={item._id} />;
      })}
    </>
  );
}
