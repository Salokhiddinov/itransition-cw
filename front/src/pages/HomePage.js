import { useState, useEffect } from "react";
import Collection from "../components/Collection";
import Item from "../components/Item";
import Loader from "../components/UI/Loader";
import axios from "../plugins/axios";

export default function HomePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   const [items, setItems] = useState([]);
  //eslint-disable-next-line
  const [items, setItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isSelected, setIsSelected] = useState("items");
  const [itemPage, setItemPage] = useState(0);
  const [itemsLeft, setItemsLeft] = useState(true);

  const getItems = async () => {
    const res = await axios.get(`recent/${itemPage}`);
    if (res.data.length < 5) setItemsLeft(false);
    items.push(...res.data);
    setItemPage(itemPage + 1);
  };
  const getCollections = async () => {
    const res = await axios.get("feed/collection");
    setCollections(res.data);
  };

  useEffect(() => {
    getCollections();
    getItems();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="text-center">
        Welcome, <span className="fw-bold">{currentUser.name}</span>
      </h1>
      <p className="text-center">Let's see what's new over there!</p>
      <div className="btn-group m-auto">
        <button
          className={
            isSelected === "items" ? "btn btn-primary" : "btn btn-secondary"
          }
          onClick={() => {
            setIsSelected("items");
          }}
        >
          Items
        </button>
        <button
          className={
            isSelected === "collections"
              ? "btn btn-primary"
              : "btn btn-secondary"
          }
          onClick={() => {
            setIsSelected("collections");
          }}
        >
          Collections
        </button>
      </div>
      <div>
        {/* Show Collections */}
        {isSelected === "collections" &&
          collections.map((collection) => {
            console.log(collection);
            return <Collection key={collection._id} collection={collection} />;
          })}

        {/* Show Items  */}
        {isSelected === "items" ? (
          <div>
            {items.map((item) => {
              return (
                <div key={item._id}>
                  <Item item={item} />
                </div>
              );
            })}
            {collections.length === 0 && <Loader />}
            {itemsLeft ? (
              <button className="btn btn-secondary" onClick={getItems}>
                Load More
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
