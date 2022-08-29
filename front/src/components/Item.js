import BaseCard from "./UI/BaseCard";
import image from "../assets/image.jpg";
import "./Item.modules.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Item(props) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <>
      <BaseCard>
        <div className="flexcontainer">
          <div className="image">
            <img src={image} alt="" />
          </div>
          <div>
            <h3>{props.item.name}</h3>
            <Link
              className="italic username"
              to={`/user/${props.item.username}`}
            >
              @{props.item.username}
            </Link>
            <ul>
              <li>{props.item.description}</li>
              <li>Price: ${props.item.price}</li>
              <li>Year: {props.item.year}</li>
              <li>From: {props.item.from}</li>
            </ul>

            <div className="tags">
              {props.item.tags.map((tag) => {
                return (
                  <span className="tag" key={tag.id}>
                    {tag.tag}
                  </span>
                );
              })}
            </div>
            <div className="likes">
              <div className="like">
                {liked ? (
                  <button
                    className="btn btn-light btn-like"
                    onClick={toggleLike}
                  >
                    Like 👍
                  </button>
                ) : null}
                {!liked ? (
                  <button
                    className="btn btn-light btn-like"
                    onClick={toggleLike}
                  >
                    Remove Like 🚮
                  </button>
                ) : null}
              </div>
              <div className="liked-by">
                <span>
                  Liked by <strong>cockboner</strong> and{" "}
                </span>
                <span className="underline">other 54 people</span>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </>
  );
}
